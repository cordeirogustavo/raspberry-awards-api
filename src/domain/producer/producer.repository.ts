import { inject, singleton } from "tsyringe";
import { IProducerRepository } from "./producer.repository.interface";
import { TProducerInner } from "./producer.types";
import { ProvidersSymbols } from "@/shared/providers";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";

@singleton()
export class ProducerRepository implements IProducerRepository {
  constructor(
    @inject(ProvidersSymbols.DatabaseConnectionProvider)
    protected databaseConnectionProvider: IDatabaseConnectionProvider
  ) {}

  async getMinMaxProducersAwards(): Promise<TProducerInner[] | []> {
    return await this.databaseConnectionProvider.getAll(
      `WITH RECURSIVE split_producers AS (
        SELECT 
          year,
          title,
          studios,
          TRIM(SUBSTR(producers, 0, 
            CASE 
              WHEN INSTR(producers, ',') > 0 THEN INSTR(producers, ',')
              WHEN INSTR(producers, ' and ') > 0 THEN INSTR(producers, ' and ')
              ELSE LENGTH(producers) + 1
            END
          )) AS producer,
          CASE 
            WHEN INSTR(producers, ',') > 0 THEN LTRIM(SUBSTR(producers, INSTR(producers, ',') + 1))
            WHEN INSTR(producers, ' and ') > 0 THEN LTRIM(SUBSTR(producers, INSTR(producers, ' and ') + 5))
            ELSE NULL
          END AS remaining_producers
        FROM movies
        WHERE producers IS NOT NULL AND LOWER(winner) = 'yes'

        UNION ALL

        SELECT 
          year,
          title,
          studios,
          TRIM(SUBSTR(remaining_producers, 0, 
            CASE 
              WHEN INSTR(remaining_producers, ',') > 0 THEN INSTR(remaining_producers, ',')
              WHEN INSTR(remaining_producers, ' and ') > 0 THEN INSTR(remaining_producers, ' and ')
              ELSE LENGTH(remaining_producers) + 1
            END
          )) AS producer,
          CASE 
            WHEN INSTR(remaining_producers, ',') > 0 THEN LTRIM(SUBSTR(remaining_producers, INSTR(remaining_producers, ',') + 1))
            WHEN INSTR(remaining_producers, ' and ') > 0 THEN LTRIM(SUBSTR(remaining_producers, INSTR(remaining_producers, ' and ') + 5))
            ELSE NULL
          END AS remaining_producers
        FROM split_producers
        WHERE remaining_producers IS NOT NULL
      ),

      ranked_wins AS (
        SELECT 
         TRIM(REPLACE(REPLACE(producer, ' and ', ''), 'and ', ''))       AS producer,
          year AS win_year,
          ROW_NUMBER() OVER (PARTITION BY LOWER(producer) ORDER BY year) AS row_num
        FROM split_producers
      ),

      winners_with_intervals AS (
        SELECT 
          previous_award.producer                              AS producer,
          previous_award.win_year                              AS previousWin,
          following_award.win_year                             AS followingWin,
          (following_award.win_year - previous_award.win_year) AS interval
        FROM ranked_wins previous_award
        INNER JOIN ranked_wins following_award ON previous_award.producer    = following_award.producer AND 
                                                  previous_award.row_num + 1 = following_award.row_num
        WHERE 
          following_award.win_year - previous_award.win_year > 0
      ),

      min_max_intervals AS (
        SELECT 
          MIN(interval) AS min_interval,
          MAX(interval) AS max_interval
        FROM winners_with_intervals
      )
      
      SELECT 
        w.producer,
        w.interval,
        w.previousWin,
        w.followingWin,
        CASE 
          WHEN w.interval = mm.min_interval THEN 'min'
          WHEN w.interval = mm.max_interval THEN 'max'
          ELSE NULL
        END AS intervalFlag
      FROM winners_with_intervals w
      INNER JOIN min_max_intervals mm 
        ON w.interval = mm.min_interval OR w.interval = mm.max_interval
      ORDER BY 
        w.producer, 
        w.previousWin;`,
      []
    );
  }
}

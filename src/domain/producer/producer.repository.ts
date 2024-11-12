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
      `WITH ranked_wins AS (
          SELECT 
            producers,
            year AS win_year,
            ROW_NUMBER() OVER (PARTITION BY producers ORDER BY year) AS row_num
          FROM movies
        ),

        winners_with_intervals AS (
          SELECT 
            previous_award.producers                             AS producer,
            previous_award.win_year                              AS previousWin,
            following_award.win_year                             AS followingWin,
            (following_award.win_year - previous_award.win_year) AS interval
          FROM ranked_wins previous_award
          INNER JOIN ranked_wins following_award ON previous_award.producers   = following_award.producers AND 
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
          w.previousWin,
          w.followingWin,
          w.interval,
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

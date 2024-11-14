import { inject, singleton } from "tsyringe";
import { IMovieRepository } from "./movie.repository.interface";
import { TMovie } from "./movie.types";
import { ProvidersSymbols } from "@/shared/providers";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";

@singleton()
export class MovieRepository implements IMovieRepository {
  constructor(
    @inject(ProvidersSymbols.DatabaseConnectionProvider)
    protected databaseConnectionProvider: IDatabaseConnectionProvider
  ) {}

  async getAllMovies(): Promise<TMovie[] | []> {
    const query = `SELECT
                    CAST(year AS TEXT) AS year, 
                    title, 
                    studios, 
                    producers, 
                    winner 
                  FROM movies`;
    return await this.databaseConnectionProvider.getAll(query, []);
  }

  async getMovieByProducer(producers: string): Promise<TMovie[] | []> {
    const query = `SELECT
                    CAST(year AS TEXT) AS year, 
                    title, 
                    studios, 
                    producers, 
                    winner 
                  FROM movies
                  WHERE LOWER(producers) = ?`;
    return await this.databaseConnectionProvider.getAll(query, [
      producers.toLocaleLowerCase(),
    ]);
  }

  async createMany(movies: TMovie[]): Promise<void> {
    const placeholders = movies.map(() => "(?, ?, ?, ?, ?)").join(", ");
    const query = `INSERT INTO movies (year, title, studios, producers, winner) VALUES ${placeholders}`;
    const params = movies.flatMap((movie) => [
      movie.year,
      movie.title,
      movie.studios,
      movie.producers,
      movie.winner,
    ]);
    return await this.databaseConnectionProvider.runQuery(query, params);
  }

  async clear(): Promise<void> {
    const query = `DELETE FROM movies`;
    return await this.databaseConnectionProvider.runQuery(query, []);
  }
}

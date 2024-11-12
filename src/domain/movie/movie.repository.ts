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
}

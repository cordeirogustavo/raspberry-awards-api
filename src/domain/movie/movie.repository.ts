import { inject, singleton } from "tsyringe";
import { IMovieRepository } from "./movie.repository.interface";
import { TMovie } from "./movie.types";
import { ProvidersSymbols } from "@/shared/providers";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";

@singleton()
export class MovieRepository implements IMovieRepository {
  static queries = {
    dirname: __dirname,
    files: [],
  };

  constructor(
    @inject(ProvidersSymbols.DatabaseConnectionProvider)
    protected databaseConnectionProvider: IDatabaseConnectionProvider
  ) {}

  async list(): Promise<TMovie[]> {
    const movies = this.databaseConnectionProvider.getAll(
      "SELECT * FROM movies",
      []
    );
    return movies;
  }

  async create(movie: TMovie): Promise<number> {
    const query =
      "INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)";
    const params = [
      movie.year,
      movie.title,
      movie.studios,
      movie.producers,
      movie.winner,
    ];
    return await this.databaseConnectionProvider.runQuery(query, params);
  }
}

import { TMovie } from "./movie.types";

export interface IMovieRepository {
  list(): Promise<TMovie[]>;
  create(movie: TMovie): Promise<number>;
  createMany(movies: TMovie[]): Promise<void>;
}

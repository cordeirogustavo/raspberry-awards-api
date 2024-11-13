import { TMovie } from "./movie.types";

export interface IMovieRepository {
  getAllMovies(): Promise<TMovie[] | []>;
  createMany(movies: TMovie[]): Promise<void>;
  clear(): Promise<void>;
}

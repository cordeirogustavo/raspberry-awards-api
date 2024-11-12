import { TMovie } from "./movie.types";

export interface IMovieRepository {
  createMany(movies: TMovie[]): Promise<void>;
}

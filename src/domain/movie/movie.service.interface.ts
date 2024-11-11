import { TMovie } from "./movie.types";

export interface IMovieService {
  list(): Promise<TMovie[]>;
  create(movie: TMovie): Promise<number>;
}

import { TMovie } from "./movie.types";

export interface IMovieService {
  import(filePath: string): Promise<void>;
  getAllMovies(): Promise<TMovie[] | []>;
}

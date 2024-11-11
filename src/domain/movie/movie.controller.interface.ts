import { IHandle } from "@/shared/interfaces";
import { TMovie } from "./movie.types";

export interface IMovieController {
  getAllMovies: IHandle<void, TMovie[]>;
  createMovie: IHandle<TMovie, { id: number }>;
}

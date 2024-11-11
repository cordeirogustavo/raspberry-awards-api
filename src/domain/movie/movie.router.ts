import { inject, singleton } from "tsyringe";
import { MovieSymbols } from "./movie.symbols";
import { IServer, IRouter } from "@/shared/interfaces";
import { IMovieController } from "./movie.controller.interface";

const PREFIX = "/movie";

@singleton()
export class MovieRouter implements IRouter {
  constructor(
    @inject(MovieSymbols.MovieController)
    private movieController: IMovieController
  ) {}

  public register(server: IServer): void {
    server.get(PREFIX, this.movieController.getAllMovies);
    server.post(PREFIX, this.movieController.createMovie);
  }
}

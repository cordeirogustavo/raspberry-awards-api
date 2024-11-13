import { inject, singleton } from "tsyringe";
import { MovieSymbols } from "./movie.symbols";
import { IHandle } from "@/shared/interfaces";
import { IMovieService } from "./movie.service.interface";
import { IMovieController } from "./movie.controller.interface";

@singleton()
export class MovieController implements IMovieController {
  constructor(
    @inject(MovieSymbols.MovieService)
    private readonly moviesService: IMovieService
  ) {}

  import: IHandle<void, void> = async (_, response) => {
    await this.moviesService.import("/database/movielist.csv");
    return response.status(200).send();
  };
}

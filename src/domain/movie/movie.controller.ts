import { inject, singleton } from "tsyringe";
import { MovieSymbols } from "./movie.symbols";
import { IHandle } from "@/shared/interfaces";
import { TMovie } from "./movie.types";
import { IMovieService } from "./movie.service.interface";
import { IMovieController } from "./movie.controller.interface";

@singleton()
export class MovieController implements IMovieController {
  constructor(
    @inject(MovieSymbols.MovieService)
    private readonly moviesService: IMovieService
  ) {}

  getAllMovies: IHandle<void, TMovie[]> = async (_, response) => {
    const movies = await this.moviesService.list();
    return response.status(200).send(movies);
  };

  createMovie: IHandle<TMovie, { id: number }> = async (request, response) => {
    const { year, title, studios, producers, winner } = request.body;
    const id = await this.moviesService.create({
      year,
      title,
      studios,
      producers,
      winner,
    });
    return response.status(201).send({ id });
  };

  import: IHandle<void, void> = async (_, response) => {
    await this.moviesService.import();
    return response.status(200).send();
  };
}

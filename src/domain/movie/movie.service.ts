import { inject, singleton } from "tsyringe";
import { MovieSymbols } from "./movie.symbols";
import { TMovie } from "./movie.types";
import { IMovieRepository } from "./movie.repository.interface";
import { IMovieService } from "./movie.service.interface";

@singleton()
export class MovieService implements IMovieService {
  constructor(
    @inject(MovieSymbols.MovieRepository)
    private readonly movieRepository: IMovieRepository
  ) {}

  async list(): Promise<TMovie[]> {
    return await this.movieRepository.list();
  }

  async create(movie: TMovie): Promise<number> {
    return await this.movieRepository.create(movie);
  }
}

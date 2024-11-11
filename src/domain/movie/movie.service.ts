import { inject, singleton } from "tsyringe";
import { MovieSymbols } from "./movie.symbols";
import { TMovie } from "./movie.types";
import { IMovieRepository } from "./movie.repository.interface";
import { IMovieService } from "./movie.service.interface";
import { CsvReaderSymbols, ICsvReader } from "@/shared/services/csv-reader";
import { movieSchema } from "./movie.schema";

@singleton()
export class MovieService implements IMovieService {
  constructor(
    @inject(MovieSymbols.MovieRepository)
    private readonly movieRepository: IMovieRepository,
    @inject(CsvReaderSymbols.CsvReaderService)
    private readonly csvReaderService: ICsvReader<TMovie>
  ) {}

  async list(): Promise<TMovie[]> {
    return await this.movieRepository.list();
  }

  async create(movie: TMovie): Promise<number> {
    return await this.movieRepository.create(movie);
  }

  async import(): Promise<void> {
    const imports = await this.csvReaderService.getData(
      "/database/movielist.csv",
      movieSchema,
      false
    );

    await this.movieRepository.createMany(imports.validData);
    console.log(imports.importErrors);
  }
}

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
  ) {
    if (process.env.NODE_ENV !== "test") {
      this.import("/database/movielist.csv");
    }
  }

  async import(filePath: string): Promise<void> {
    const imports = await this.csvReaderService.getData(
      filePath,
      movieSchema,
      false
    );
    if (!imports.validData.length) return;
    await this.movieRepository.createMany(imports.validData);
  }

  async getAllMovies(): Promise<TMovie[] | []> {
    return await this.movieRepository.getAllMovies();
  }
}

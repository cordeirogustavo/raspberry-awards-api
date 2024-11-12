import "reflect-metadata";
import "@/shared/app/app.container";

import { IMovieService } from "./src/domain/movie/movie.service.interface";
import { MovieSymbols } from "./src/domain/movie/movie.symbols";
import { container } from "tsyringe";

process.env.NODE_ENV = "test";

const movieService = container.resolve<IMovieService>(
  MovieSymbols.MovieService
);
await movieService.import("/mocks/mocked-movie-data.csv");

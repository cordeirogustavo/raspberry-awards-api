import { DependencyContainer } from "tsyringe";

import { IContainer, IRouter } from "@/shared/interfaces";

import { MovieService } from "./movie.service";
import { IMovieService } from "./movie.service.interface";

import { IMovieRepository } from "./movie.repository.interface";
import { MovieRepository } from "./movie.repository";

import { MovieSymbols } from "./movie.symbols";

import { MovieController } from "./movie.controller";
import { IMovieController } from "./movie.controller.interface";

import { MovieRouter } from "./movie.router";

export class MovieContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IMovieRepository>(
      MovieSymbols.MovieRepository,
      MovieRepository
    );
    container.register<IMovieService>(MovieSymbols.MovieService, MovieService);
    container.register<IMovieController>(
      MovieSymbols.MovieController,
      MovieController
    );
    container.register<IRouter>(MovieSymbols.MovieRouter, MovieRouter);
  }
}

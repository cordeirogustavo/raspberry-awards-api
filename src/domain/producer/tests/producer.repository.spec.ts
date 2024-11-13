import { describe, it, expect, vi } from "vitest";
import { container } from "tsyringe";
import { IProducerRepository } from "../producer.repository.interface";
import { ProducerSymbols } from "../producer.symbols";
import { IMovieRepository } from "@/domain/movie/movie.repository.interface";
import { MovieSymbols } from "@/domain/movie";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers";

describe("ProducerRepository", () => {
  let producerRepository: IProducerRepository;
  let movieRepository: IMovieRepository;
  let databaseConnectionProvider: IDatabaseConnectionProvider;

  beforeAll(() => {
    producerRepository = container.resolve<IProducerRepository>(
      ProducerSymbols.ProducerRepository
    );
    movieRepository = container.resolve<IMovieRepository>(
      MovieSymbols.MovieRepository
    );
    databaseConnectionProvider = container.resolve<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider
    );
    vi.clearAllMocks();
  });

  it("should return producers with min and max intervals correctly", async () => {
    expect(await producerRepository.getMinMaxProducersAwards()).toEqual([
      {
        followingWin: 1991,
        interval: 1,
        intervalFlag: "min",
        previousWin: 1990,
        producer: "Joel Silver",
      },
      {
        followingWin: 2015,
        interval: 13,
        intervalFlag: "max",
        previousWin: 2002,
        producer: "Matthew Vaughn",
      },
    ]);
  });
  it("should return a empty array if no movies from producers are found", async () => {
    await databaseConnectionProvider.runQuery("BEGIN TRANSACTION", []);
    await movieRepository.clear();
    expect(await producerRepository.getMinMaxProducersAwards()).toEqual([]);
    await databaseConnectionProvider.runQuery("ROLLBACK", []);
  });
});

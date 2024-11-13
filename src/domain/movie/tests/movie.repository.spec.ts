import { describe, it, expect, vi, beforeEach } from "vitest";
import { container } from "tsyringe";
import { IMovieRepository } from "@/domain/movie/movie.repository.interface";
import { MovieSymbols } from "@/domain/movie";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers";
import { CsvReaderSymbols, ICsvReader } from "@/shared/services/csv-reader";
import { TMovie } from "../movie.types";

describe("MovieRepository", () => {
  let movieRepository: IMovieRepository;
  let csvReaderService: ICsvReader<TMovie>;
  let databaseConnectionProvider: IDatabaseConnectionProvider;

  beforeAll(() => {
    movieRepository = container.resolve<IMovieRepository>(
      MovieSymbols.MovieRepository
    );
    csvReaderService = container.resolve<ICsvReader<TMovie>>(
      CsvReaderSymbols.CsvReaderService
    );
    databaseConnectionProvider = container.resolve<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider
    );
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    vi.clearAllMocks();
    await databaseConnectionProvider.runQuery("BEGIN TRANSACTION", []);
  });

  afterEach(async () => {
    await databaseConnectionProvider.runQuery("ROLLBACK", []);
  });

  it("should return same movies count in database as in csv", async () => {
    const csvData = await csvReaderService.getData(
      "/mocks/mocked-movie-data.csv",
      null,
      false
    );

    expect((await movieRepository.getAllMovies()).length).toEqual(
      csvData.validData.length
    );
  });

  it("should create movies in database", async () => {
    await movieRepository.clear();
    const csvData = await csvReaderService.getData(
      "/mocks/mocked-movie-data.csv",
      null,
      false
    );
    await movieRepository.createMany(csvData.validData);
    expect((await movieRepository.getAllMovies()).length).toEqual(
      csvData.validData.length
    );
  });

  it("should clear database", async () => {
    await movieRepository.clear();
    expect((await movieRepository.getAllMovies()).length).toEqual(0);
  });
});

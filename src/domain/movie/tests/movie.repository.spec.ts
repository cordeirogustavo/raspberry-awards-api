import { describe, it, expect, vi, beforeEach } from "vitest";
import { container } from "tsyringe";
import { IMovieRepository } from "@/domain/movie/movie.repository.interface";
import { MovieSymbols } from "@/domain/movie";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers";
import { CsvReaderSymbols, ICsvReader } from "@/shared/services/csv-reader";
import { TMovie } from "../movie.types";

describe("MovieRepository", () => {
  const CSV_COUNT_OF_MOVIES = 206;
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
    expect((await movieRepository.getAllMovies()).length).toEqual(
      CSV_COUNT_OF_MOVIES
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
      CSV_COUNT_OF_MOVIES
    );
  });

  it("should return same movies in database as in mocked csv", async () => {
    const csvData = await csvReaderService.getData(
      "/mocks/mocked-movie-data.csv",
      null,
      false
    );
    expect(await movieRepository.getAllMovies()).toEqual(csvData.validData);
  });

  it("should return an empty array when no producers are found", async () => {
    expect(
      await movieRepository.getMovieByProducer("not-existing-producers")
    ).toEqual([]);
  });

  it("should return a array with movies when producers are found", async () => {
    const expectedResult = [
      {
        producers: "Hank Moonjean",
        studios: "Warner Bros., Universal Studios",
        title: "Stroker Ace",
        winner: "",
        year: "1983",
      },
    ];
    expect(await movieRepository.getMovieByProducer("Hank Moonjean")).toEqual(
      expectedResult
    );
  });

  it("should clear database", async () => {
    await movieRepository.clear();
    expect((await movieRepository.getAllMovies()).length).toEqual(0);
  });
});

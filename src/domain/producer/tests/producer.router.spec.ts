import app from "@/app";
import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import { IMovieRepository } from "@/domain/movie/movie.repository.interface";
import { container } from "tsyringe";
import { MovieSymbols } from "@/domain/movie";
import { IDatabaseConnectionProvider } from "@/shared/providers/database-provider";
import { ProvidersSymbols } from "@/shared/providers";

describe("Producer API Endpoints", () => {
  let movieRepository: IMovieRepository;
  let databaseConnectionProvider: IDatabaseConnectionProvider;

  beforeAll(async () => {
    databaseConnectionProvider = container.resolve<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider
    );
    movieRepository = container.resolve<IMovieRepository>(
      MovieSymbols.MovieRepository
    );
  });

  beforeEach(async () => {
    await databaseConnectionProvider.runQuery("BEGIN TRANSACTION", []);
  });

  afterEach(async () => {
    await databaseConnectionProvider.runQuery("ROLLBACK", []);
  });

  it("should return producers with min and max intervals correctly", async () => {
    const response = await request(app).get("/producer/awards-intervals/range");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    });
  });

  it("should return an empty array if no producers are found", async () => {
    await movieRepository.clear();

    const response = await request(app).get("/producer/awards-intervals/range");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ min: [], max: [] });
  });
});

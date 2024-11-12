import { describe, it, expect, vi, beforeEach } from "vitest";
import { container } from "tsyringe";
import { IProducerRepository } from "../producer.repository.interface";
import { ProducerSymbols } from "../producer.symbols";

describe("ProducerRepository", () => {
  let producerRepository: IProducerRepository;

  beforeAll(() => {
    producerRepository = container.resolve<IProducerRepository>(
      ProducerSymbols.ProducerRepository
    );
    vi.clearAllMocks();
  });

  describe("getMinMaxProducersAwards", () => {
    it("should return producers with min and max intervals correctly", async () => {
      expect(await producerRepository.getMinMaxProducersAwards()).toEqual([
        {
          followingWin: 1990,
          interval: 6,
          intervalFlag: "max",
          previousWin: 1984,
          producer: "Bo Derek",
        },
        {
          followingWin: 1995,
          interval: 1,
          intervalFlag: "min",
          previousWin: 1994,
          producer: "Kevin Costner",
        },
        {
          followingWin: 2019,
          interval: 6,
          intervalFlag: "max",
          previousWin: 2013,
          producer: "Ozzie Areu",
        },
        {
          followingWin: 2012,
          interval: 1,
          intervalFlag: "min",
          previousWin: 2011,
          producer: "Wyck Godfrey",
        },
      ]);
    });
  });
});

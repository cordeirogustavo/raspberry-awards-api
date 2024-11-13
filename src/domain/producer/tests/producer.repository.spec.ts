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
  });
});

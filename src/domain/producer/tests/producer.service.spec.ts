import { describe, it, expect, vi } from "vitest";
import { container } from "tsyringe";
import { ProducerSymbols } from "../producer.symbols";
import { IProducerService } from "../producer.service.interface";

describe("ProducerRepository", () => {
  let producerService: IProducerService;

  beforeAll(() => {
    producerService = container.resolve<IProducerService>(
      ProducerSymbols.ProducerService
    );
    vi.clearAllMocks();
  });

  it("should return producers with min and max intervals correctly to endpoint", async () => {
    expect(await producerService.getAwardsInterval()).toEqual({
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
});

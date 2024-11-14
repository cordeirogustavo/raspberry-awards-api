import { describe, it, expect, vi } from "vitest";
import { container } from "tsyringe";
import { ProducerSymbols } from "../producer.symbols";
import { IProducerService } from "../producer.service.interface";
import { IProducerRepository } from "../producer.repository.interface";
import { ProducerService } from "../producer.service";

function generateMockData() {
  const mockedMinValue = {
    producer: "mocked-min",
    interval: 1,
    previousWin: 2023,
    followingWin: 2024,
  };
  const mockedMaxValue = {
    producer: "mocked-max",
    interval: 10,
    previousWin: 2014,
    followingWin: 2024,
  };

  const producerRepository: IProducerRepository = {
    getMinMaxProducersAwards: vi.fn().mockResolvedValue([
      { ...mockedMinValue, intervalFlag: "min" },
      { ...mockedMaxValue, intervalFlag: "max" },
    ]),
  };

  const producerService = new ProducerService(producerRepository);

  return {
    mockedMaxValue,
    mockedMinValue,
    producerService,
    producerRepository,
  };
}
describe("ProducerService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return producers with min and max intervals correctly", async () => {
    const {
      mockedMaxValue,
      mockedMinValue,
      producerService,
      producerRepository,
    } = generateMockData();

    const response = await producerService.getAwardsInterval();

    expect(producerRepository.getMinMaxProducersAwards).toHaveBeenCalledTimes(
      1
    );

    expect(response).toEqual({
      min: [mockedMinValue],
      max: [mockedMaxValue],
    });
  });
});

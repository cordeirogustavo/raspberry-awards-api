import { describe, it, expect, vi } from "vitest";
import { container } from "tsyringe";
import { ProducerSymbols } from "../producer.symbols";
import { IProducerController } from "../producer.controller.interface";
import { INextFunction, IRequest, IResponse } from "@/shared/interfaces";
import { ProducerController } from "../producer.controller";
import { IProducerService } from "../producer.service.interface";

describe("ProducerController", () => {
  let producerController: IProducerController =
    container.resolve<IProducerController>(ProducerSymbols.ProducerController);

  beforeAll(() => {
    const producerServiceStub = {
      getAwardsInterval: vi.fn().mockResolvedValueOnce(undefined),
    } as IProducerService;

    producerController = new ProducerController(producerServiceStub);

    vi.clearAllMocks();
  });
  it("should call producerService.getAwardsInterval and return status 200", async () => {
    const mockRequest = {} as IRequest<void>;
    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockResolvedValue({
        min: [
          {
            producer: "min-mocked-producer",
            interval: 1,
            previousWin: 1984,
            followingWin: 1985,
          },
        ],
        max: [
          {
            producer: "max-mocked-producer",
            interval: 6,
            previousWin: 1984,
            followingWin: 1990,
          },
        ],
      }),
    } as unknown as IResponse;
    const mockedNext = {} as INextFunction;

    const result = await producerController.getAwardsInterval(
      mockRequest,
      mockResponse,
      mockedNext
    );

    expect(result).toBe(result);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toBeCalledTimes(1);
  });
});

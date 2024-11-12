import { inject, singleton } from "tsyringe";
import { ProducerSymbols } from "./producer.symbols";
import { IHandle } from "@/shared/interfaces";
import { TProducerAwardsIntervalDTO, TProducerInner } from "./producer.types";
import { IProducerService } from "./producer.service.interface";
import { IProducerController } from "./producer.controller.interface";

@singleton()
export class ProducerController implements IProducerController {
  constructor(
    @inject(ProducerSymbols.ProducerService)
    private readonly producersService: IProducerService
  ) {}

  getAwardsInterval: IHandle<void, TProducerAwardsIntervalDTO> = async (
    _,
    response
  ) => {
    const awardsInterval = await this.producersService.getAwardsInterval();
    return response.status(200).send(awardsInterval);
  };
}

import { inject, singleton } from "tsyringe";
import { ProducerSymbols } from "./producer.symbols";
import { IServer, IRouter } from "@/shared/interfaces";
import { IProducerController } from "./producer.controller.interface";

const PREFIX = "/producer";

@singleton()
export class ProducerRouter implements IRouter {
  constructor(
    @inject(ProducerSymbols.ProducerController)
    private producerController: IProducerController
  ) {}

  public register(server: IServer): void {
    server.get(
      `${PREFIX}/awards-intervals/range`,
      this.producerController.getAwardsInterval
    );
  }
}

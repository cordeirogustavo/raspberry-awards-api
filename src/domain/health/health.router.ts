import { inject, singleton } from "tsyringe";
import { HealthSymbols } from "./health.symbols";
import { IServer, IRouter } from "@/shared/interfaces";
import { IHealthController } from "./health.controller.interface";

const PREFIX = "/health";

@singleton()
export class HealthRouter implements IRouter {
  constructor(
    @inject(HealthSymbols.HealthController)
    private healthController: IHealthController
  ) {}

  public register(server: IServer): void {
    server.get(PREFIX, this.healthController.health);
  }
}

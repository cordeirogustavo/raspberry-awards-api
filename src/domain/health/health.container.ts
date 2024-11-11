import { DependencyContainer } from "tsyringe";
import { IContainer, IRouter } from "@/shared/interfaces";
import { HealthController } from "./health.controller";
import { IHealthController } from "./health.controller.interface";

import { HealthRouter } from "./health.router";
import { HealthSymbols } from "./health.symbols";

export class HealthContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IHealthController>(
      HealthSymbols.HealthController,
      HealthController
    );
    container.register<IRouter>(HealthSymbols.HealthRouter, HealthRouter);
  }
}

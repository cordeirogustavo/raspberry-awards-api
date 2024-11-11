import { inject, injectable } from "tsyringe";

import { IRouter, IServer } from "@/shared/interfaces";

import { HealthSymbols } from "@/domain/health";

@injectable()
export class AppRouter implements IRouter {
  constructor(
    @inject(HealthSymbols.HealthRouter) private healthRouter: IRouter
  ) {}

  public register(server: IServer) {
    this.healthRouter.register(server);
  }
}

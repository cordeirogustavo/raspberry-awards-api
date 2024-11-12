import { inject, injectable } from "tsyringe";

import { IRouter, IServer } from "@/shared/interfaces";

import { HealthSymbols } from "@/domain/health";
import { MovieSymbols } from "@/domain/movie";
import { ProducerSymbols } from "@/domain/producer";

@injectable()
export class AppRouter implements IRouter {
  constructor(
    @inject(HealthSymbols.HealthRouter) private healthRouter: IRouter,
    @inject(MovieSymbols.MovieRouter) private movieRouter: IRouter,
    @inject(ProducerSymbols.ProducerRouter) private producerRouter: IRouter
  ) {}

  public register(server: IServer) {
    this.healthRouter.register(server);
    this.movieRouter.register(server);
    this.producerRouter.register(server);
  }
}

import { Express } from "express";
import { inject, injectable } from "tsyringe";

import { IRouter } from "@/shared/interfaces";

@injectable()
export class AppRouter implements IRouter {
  constructor() {}

  public register(server: Express) {}
}

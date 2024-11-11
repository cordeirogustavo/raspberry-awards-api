import { DependencyContainer } from "tsyringe";

import { IContainer } from "@/shared/interfaces";

import {
  DatabaseConnectionProvider,
  IDatabaseConnectionProvider,
} from "./database-provider";
import { ProvidersSymbols } from "./providers.symbols";

export class ProvidersContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider,
      {
        useValue: new DatabaseConnectionProvider(),
      }
    );
  }
}

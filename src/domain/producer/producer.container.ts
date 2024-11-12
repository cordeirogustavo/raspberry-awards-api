import { DependencyContainer } from "tsyringe";

import { IContainer, IRouter } from "@/shared/interfaces";

import { ProducerService } from "./producer.service";
import { IProducerService } from "./producer.service.interface";

import { IProducerRepository } from "./producer.repository.interface";
import { ProducerRepository } from "./producer.repository";

import { ProducerSymbols } from "./producer.symbols";

import { ProducerController } from "./producer.controller";
import { IProducerController } from "./producer.controller.interface";

import { ProducerRouter } from "./producer.router";

export class ProducerContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<IProducerRepository>(
      ProducerSymbols.ProducerRepository,
      ProducerRepository
    );
    container.register<IProducerService>(
      ProducerSymbols.ProducerService,
      ProducerService
    );
    container.register<IProducerController>(
      ProducerSymbols.ProducerController,
      ProducerController
    );
    container.register<IRouter>(ProducerSymbols.ProducerRouter, ProducerRouter);
  }
}

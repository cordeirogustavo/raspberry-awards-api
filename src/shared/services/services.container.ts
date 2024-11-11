import { DependencyContainer } from "tsyringe";
import { IContainer } from "@/shared/interfaces";
import { ServicesSymbols } from "./";
import { ICsvReader, CsvReaderService } from "./csv-reader";

export class ServicesContainer implements Partial<IContainer> {
  static register<T>(container: DependencyContainer): void {
    container.register<ICsvReader<T>>(
      ServicesSymbols.CsvReaderService,
      CsvReaderService
    );
  }
}

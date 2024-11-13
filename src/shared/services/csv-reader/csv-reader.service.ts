import * as fs from "fs";
import local from "path";
import csv from "csv-parser";
import { z, ZodError } from "zod";
import { ICsvReader, TCsvData } from "./csv-reader.service.interface";
import { singleton } from "tsyringe";
import { AppError } from "@/shared/errors";

@singleton()
export class CsvReaderService<T> implements ICsvReader<T> {
  public async getData<T>(
    filePath: string,
    schemaValidation: z.ZodSchema | null,
    validate: boolean = false
  ): Promise<TCsvData<T>> {
    const data = await this.parseCSV(filePath);
    const importErrors: string[] = [];

    if (!validate || !schemaValidation) {
      return { validData: data, importErrors };
    }

    const validData = data.map((row, index) => {
      try {
        const parsed = schemaValidation.parse(row);
        return parsed;
      } catch (error) {
        if (error instanceof ZodError) {
          importErrors.push(
            `Validation error at row ${index + 1}: ${error.errors
              .map((e) => e.message)
              .join(", ")}\n`
          );
        }
        console.error(error);
        return null;
      }
    });
    const filteredValidData = validData.filter(
      (item): item is T => item !== null && item !== undefined
    );
    return { validData: filteredValidData, importErrors };
  }

  private parseCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const fileDir = local.join(__dirname, "../../..", filePath);

      if (!fs.existsSync(fileDir)) {
        console.error(
          `********* File not found, insert a valid file with required name in path: src${filePath} *********`
        );
        return reject(
          new AppError(
            `File not found, insert a valid file with required name in path: src${filePath}`,
            404
          )
        );
      }
      fs.createReadStream(fileDir)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", (err) => reject(new AppError(err.message, 400)));
    });
  }
}

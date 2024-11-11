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
    schemaValidation: z.ZodSchema,
    validate: boolean = false
  ): Promise<TCsvData<T>> {
    const data = await this.parseCSV(filePath);
    const importErrors: string[] = [];

    if (!validate) {
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
        return reject(new AppError("File not found", 404));
      }
      fs.createReadStream(fileDir)
        .pipe(csv())
        .on("data", (data) => {
          const [rawHeaders] = Object.keys(data);
          const [rawValues]: string[] = Object.values(data);

          const headers = rawHeaders.split(";");
          const values = rawValues.split(";");

          const parsedRow = headers.reduce((acc: any, header, index) => {
            acc[header.trim()] = values[index] ? values[index].trim() : null;
            return acc;
          }, {});

          results.push(parsedRow);
        })
        .on("end", () => resolve(results))
        .on("error", (err) => reject(new AppError(err.message, 400)));
    });
  }
}

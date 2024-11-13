import { AnyZodObject, z } from "zod";

export type TCsvData<T> = {
  validData: T[];
  importErrors: string[];
};

export interface ICsvReader<T> {
  getData(
    filePath: string,
    schemaValidation: z.ZodSchema | null,
    validate: boolean
  ): Promise<TCsvData<T>>;
}

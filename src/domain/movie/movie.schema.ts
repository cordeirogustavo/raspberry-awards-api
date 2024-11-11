import { z } from "zod";

export const movieSchema = z.object({
  year: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), {
      message: "Year must be a valid number",
    }),
  title: z.string(),
  studios: z.string().nullable(),
  producers: z.string().nullable(),
  winner: z
    .enum(["yes", "no", ""], {
      invalid_type_error: "available options is yes/no",
    })
    .optional()
    .nullable(),
});

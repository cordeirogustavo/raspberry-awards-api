import { AppError } from "@/shared/errors";
import { INextFunction, IRequest, IResponse } from "../interfaces";

export function errorHandler(
  err: Error,
  req: IRequest<any>,
  res: IResponse,
  next: INextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: err.statusCode,
    });
    return;
  }

  res.status(500).json({
    message: "Internal Server Error",
    code: 500,
  });
}

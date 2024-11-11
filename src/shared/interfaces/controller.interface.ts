import { NextFunction, Request, Response, Express } from "express";

export interface IRequest<T> extends Request {
  query: Record<string, any>;
  params: Record<string, string>;
  body: Record<string, any>;
  url: string;
  method: string;
}

export type IResponse<T = any> = Response<T, any>;

export type INextFunction = NextFunction;

export type IHandle<RequestDTO = any, ResponseDTO = any> = (
  request: IRequest<RequestDTO>,
  response: IResponse<ResponseDTO>,
  next: INextFunction
) => Promise<void | IResponse<ResponseDTO>>;

export type IServer = Express;

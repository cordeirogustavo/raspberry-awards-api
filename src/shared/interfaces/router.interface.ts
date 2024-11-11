import { IServer } from "./controller.interface";

export interface IRouter {
  register(server: IServer): void;
}

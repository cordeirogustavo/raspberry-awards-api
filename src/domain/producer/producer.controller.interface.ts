import { IHandle } from "@/shared/interfaces";
import { TProducerAwardsIntervalDTO } from "./producer.types";

export interface IProducerController {
  getAwardsInterval: IHandle<void, TProducerAwardsIntervalDTO>;
}

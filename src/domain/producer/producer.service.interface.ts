import { TProducerInner, TProducerAwardsIntervalDTO } from "./producer.types";

export interface IProducerService {
  getAwardsInterval(): Promise<TProducerAwardsIntervalDTO>;
}

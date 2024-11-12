import { TProducerInner } from "./producer.types";

export interface IProducerRepository {
  getMinMaxProducersAwards(): Promise<TProducerInner[] | []>;
}

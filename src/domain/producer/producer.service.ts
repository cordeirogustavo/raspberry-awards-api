import { inject, singleton } from "tsyringe";
import { ProducerSymbols } from "./producer.symbols";
import { TProducerAwardsIntervalDTO, TProducerInner } from "./producer.types";
import { IProducerRepository } from "./producer.repository.interface";
import { IProducerService } from "./producer.service.interface";

@singleton()
export class ProducerService implements IProducerService {
  constructor(
    @inject(ProducerSymbols.ProducerRepository)
    private readonly producerRepository: IProducerRepository
  ) {}

  async getAwardsInterval(): Promise<TProducerAwardsIntervalDTO> {
    const awards = await this.producerRepository.getMinMaxProducersAwards();

    const awardsResponse: TProducerAwardsIntervalDTO = {
      min: [],
      max: [],
    };

    for (const award of awards) {
      const producerAward = {
        producer: award.producer,
        interval: award.interval,
        previousWin: award.previousWin,
        followingWin: award.followingWin,
      };
      if (award.intervalFlag === "min") {
        awardsResponse.min.push(producerAward);
        continue;
      }
      awardsResponse.max.push(producerAward);
    }

    return awardsResponse;
  }
}

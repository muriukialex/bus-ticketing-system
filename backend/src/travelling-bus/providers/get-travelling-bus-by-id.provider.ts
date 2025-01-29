import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TRAVELLING_BUS_DOES_NOT_EXIST,
  UNABLE_TO_PROCESS_REQUEST,
} from 'src/common/error-messages/error-messages';
import { Repository } from 'typeorm';
import { TravellingBus } from '../travelling-bus.entity';

@Injectable()
export class GetTravellingBusByIdProvider {
  constructor(
    /**
     * Inject travellingBusRepository
     */
    @InjectRepository(TravellingBus)
    private readonly travellingBusRepository: Repository<TravellingBus>,
  ) {}

  public async getTravellingBusById(id: number) {
    let travellingBus = null;
    try {
      travellingBus = await this.travellingBusRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    if (!travellingBus) {
      throw new BadRequestException(TRAVELLING_BUS_DOES_NOT_EXIST.message, {
        description: TRAVELLING_BUS_DOES_NOT_EXIST.description,
      });
    }

    return travellingBus;
  }
}

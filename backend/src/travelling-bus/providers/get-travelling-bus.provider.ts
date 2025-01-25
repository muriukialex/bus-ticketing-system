import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { TravellingBus } from '../travelling-bus.entity';

@Injectable()
export class GetTravellingBusProvider {
  constructor(
    /**
     * Inject paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject travellingBusRepository
     */
    @InjectRepository(TravellingBus)
    private readonly travellingBusRepository: Repository<TravellingBus>,
  ) {}

  public async getAllTravellingBuses(
    getTravellingBusQuery: PaginationQueryDto,
    origin?: string,
    destination?: string,
  ) {
    let travellingBuses = null;

    try {
      const additionalParams = {
        route: {
          origin: origin,
          destination: destination,
        },
      };

      travellingBuses = await this.paginationProvider.paginateQuery(
        getTravellingBusQuery,
        this.travellingBusRepository,
        additionalParams,
      );
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }
    return travellingBuses;
  }
}

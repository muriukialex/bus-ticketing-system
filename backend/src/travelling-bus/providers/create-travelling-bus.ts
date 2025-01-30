import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ROUTE_DOES_NOT_EXIST,
  UNABLE_TO_PROCESS_REQUEST,
} from 'src/common/error-messages/error-messages';
import { RoutesService } from 'src/routes/providers/routes.service';
import { Repository } from 'typeorm';
import { CreateTravellingBusDto } from '../dtos/create-travelling-bus.dto';
import { TravellingBus } from '../travelling-bus.entity';

@Injectable()
export class CreateTravellingBusProvider {
  constructor(
    /**
     * Inject travellingBuses repository
     */
    @InjectRepository(TravellingBus)
    private readonly travellingBusesRepository: Repository<TravellingBus>,

    /**
     * Inject route service
     */
    private readonly routeService: RoutesService,
  ) {}

  public async createTravellingBus(
    createTravellingBusDto: CreateTravellingBusDto,
  ) {
    const validRoute = await this.routeService.getRouteById(
      createTravellingBusDto.routeId,
    );

    if (!validRoute) {
      throw new BadRequestException(ROUTE_DOES_NOT_EXIST.message, {
        description: ROUTE_DOES_NOT_EXIST.description,
      });
    }

    let newTravellingBus = this.travellingBusesRepository.create({
      ...createTravellingBusDto,
      route: validRoute,
    });

    try {
      newTravellingBus =
        await this.travellingBusesRepository.save(newTravellingBus);
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    return newTravellingBus;
  }
}

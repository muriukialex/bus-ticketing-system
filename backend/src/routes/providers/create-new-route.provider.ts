import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ROUTE_DUPLICATION_ERROR,
  UNABLE_TO_PROCESS_REQUEST,
} from 'src/common/error-messages/error-messages';
import { Repository } from 'typeorm';
import { CreateNewRouteDto } from '../dtos/create-new-route.dto';
import { Route } from '../route.entity';

@Injectable()
export class CreateNewRouteProvider {
  constructor(
    /**
     * Inject the routeRepository
     */
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  public async createNewRoute(createNewRouteDto: CreateNewRouteDto) {
    // we want to persist this record in the DB
    // Nairobi -> Mombasa
    // check if there is an existing route with same origin and destination already exists
    let existingRoute = null;
    try {
      existingRoute = await this.routeRepository.findOne({
        where: {
          origin: createNewRouteDto.origin,
          destination: createNewRouteDto.destination,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    console.log('existingRoute', existingRoute);
    if (existingRoute) {
      throw new BadRequestException(ROUTE_DUPLICATION_ERROR.message, {
        description: ROUTE_DUPLICATION_ERROR.description,
      });
    }

    let newRoute = this.routeRepository.create(createNewRouteDto);

    try {
      newRoute = await this.routeRepository.save(newRoute);
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    return newRoute;
  }
}

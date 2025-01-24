import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RECORD_DOES_NOT_EXIST,
  UNABLE_TO_PROCESS_REQUEST,
} from 'src/common/error-messages/error-messages';
import { Repository } from 'typeorm';
import { Route } from '../route.entity';

@Injectable()
export class GetRouteByIdProvider {
  constructor(
    /**
     * Inject routeRepository
     */
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  public async getRouteById(id: number) {
    let route = null;
    try {
      route = await this.routeRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    if (!route) {
      throw new BadRequestException(RECORD_DOES_NOT_EXIST.message, {
        description: RECORD_DOES_NOT_EXIST.description,
      });
    }

    return route;
  }
}

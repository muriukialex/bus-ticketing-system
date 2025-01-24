import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { Route } from '../route.entity';

@Injectable()
export class GetAllRoutesProvider {
  constructor(
    /**
     * Inject paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject routesRepository
     */
    @InjectRepository(Route)
    private readonly routesRepository: Repository<Route>,
  ) {}

  public async getAllRoutes(getRoutesQuery: PaginationQueryDto) {
    let routes = null;

    try {
      // users = await this.usersRepository.find();
      routes = await this.paginationProvider.paginateQuery(
        getRoutesQuery,
        this.routesRepository,
      );
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }
    return routes;
  }
}

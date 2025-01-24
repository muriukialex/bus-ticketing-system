import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { CreateNewRouteDto } from '../dtos/create-new-route.dto';
import { CreateNewRouteProvider } from './create-new-route.provider';
import { GetAllRoutesProvider } from './get-all-routes.provider';
import { GetRouteByIdProvider } from './get-route-by-id.provider';

@Injectable()
export class RoutesService {
  constructor(
    /**
     * Inject createNewRouteProvider
     */
    private readonly createNewRouteProvider: CreateNewRouteProvider,

    /**
     * Inject getAllRoutesProvider
     */
    private readonly getAllRoutesProvider: GetAllRoutesProvider,

    /**
     * Inject getRouteByIdProvider
     */
    private readonly getRouteByIdProvider: GetRouteByIdProvider,
  ) {}

  public async createNewRoute(createNewRouteDto: CreateNewRouteDto) {
    return this.createNewRouteProvider.createNewRoute(createNewRouteDto);
  }

  public async getAllRoutes(getRoutesQuery: PaginationQueryDto) {
    return this.getAllRoutesProvider.getAllRoutes(getRoutesQuery);
  }

  public async getRouteById(id: number) {
    return this.getRouteByIdProvider.getRouteById(id);
  }
}

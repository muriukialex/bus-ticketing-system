import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { CreateTravellingBusDto } from '../dtos/create-travelling-bus.dto';
import { PatchTravellingBusDto } from '../dtos/patch-travelling-bus.dto';
import { CreateTravellingBusProvider } from './create-travelling-bus';
import { GetTravellingBusByIdProvider } from './get-travelling-bus-by-id.provider';
import { GetTravellingBusProvider } from './get-travelling-bus.provider';
import { UpdateTravellingBusProvider } from './update-travelling-bus.provider';

@Injectable()
export class TravellingBusService {
  constructor(
    /**
     * Inject createTravellingBusProvider
     */
    private readonly createTravellingBusProvider: CreateTravellingBusProvider,
    /**
     * Inject getTravellingBusProvider
     */
    private readonly getTravellingBusProvider: GetTravellingBusProvider,
    /**
     * Inject getTravellingBusIdProvider
     */
    private readonly getTravellingBusByIdProvider: GetTravellingBusByIdProvider,

    /**
     * Inject updateTravellingBusProvider
     */
    private readonly updateTravellingBusProvider: UpdateTravellingBusProvider,
  ) {}

  public async createTravellingBus(
    createTravellingBusDto: CreateTravellingBusDto,
  ) {
    return this.createTravellingBusProvider.createTravellingBus(
      createTravellingBusDto,
    );
  }

  public async getAllTravellingBuses(
    getTravellingBusQuery: PaginationQueryDto,
    origin?: string,
    destination?: string,
  ) {
    return this.getTravellingBusProvider.getAllTravellingBuses(
      getTravellingBusQuery,
      origin,
      destination,
    );
  }

  public async getTravellingBusById(id: number) {
    return this.getTravellingBusByIdProvider.getTravellingBusById(id);
  }

  public async updateTravellingBus(
    patchTravellingBusDto: PatchTravellingBusDto,
  ) {
    return this.updateTravellingBusProvider.updateTravellingBus(
      patchTravellingBusDto,
    );
  }
}

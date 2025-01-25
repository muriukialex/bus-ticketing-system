import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { CreateTravellingBusDto } from './dtos/create-travelling-bus.dto';
import { GetTravellingBusParamDto } from './dtos/get-travelling-bus-param.dto';
import { TravellingBusService } from './providers/travelling-bus.service';

@Controller('travelling-bus')
export class TravellingBusController {
  constructor(
    /**
     * Inject travellingBusService
     */
    private readonly travellingBusService: TravellingBusService,
  ) {}

  @Get(':id?')
  public getTravellingBuses(
    @Param() getTravellingBusParamDto: GetTravellingBusParamDto,
    @Query('per', new DefaultValuePipe(10), ParseIntPipe) per: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ) {
    if (getTravellingBusParamDto.id) {
      return this.travellingBusService.getTravellingBusById(
        getTravellingBusParamDto.id,
      );
    }

    const getTravellingBusQuery: PaginationQueryDto = {
      per,
      page,
    };

    return this.travellingBusService.getAllTravellingBuses(
      getTravellingBusQuery,
      origin,
      destination,
    );
  }

  @Post()
  public createTravellingBus(
    @Body() createTravellingBusDto: CreateTravellingBusDto,
  ) {
    return this.travellingBusService.createTravellingBus(
      createTravellingBusDto,
    );
  }
}

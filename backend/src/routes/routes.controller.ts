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
import { CreateNewRouteDto } from './dtos/create-new-route.dto';
import { GetRouteParamDto } from './dtos/get-route-param.dto';
import { RoutesService } from './providers/routes.service';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';

@Controller('routes')
export class RoutesController {
  constructor(
    /**
     * Inject routeService
     */
    private readonly routesService: RoutesService,
  ) {}

  @Get('routes')
  public getRoutes(
    @Param() getRouteParamDto: GetRouteParamDto,
    @Query('per', new DefaultValuePipe(10), ParseIntPipe) per: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    if (getRouteParamDto.id) {
      return this.routesService.getRouteById(getRouteParamDto.id);
    }

    const getRoutesQuery: PaginationQueryDto = {
      per,
      page,
    };

    return this.routesService.getAllRoutes(getRoutesQuery);
  }

  @Post('routes')
  public createNewRoute(@Body() createNewRouteDto: CreateNewRouteDto) {
    return this.routesService.createNewRoute(createNewRouteDto);
  }
}

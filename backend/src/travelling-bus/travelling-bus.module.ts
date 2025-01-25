import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { Route } from 'src/routes/route.entity';
import { RoutesModule } from 'src/routes/routes.module';
import { CreateTravellingBusProvider } from './providers/create-travelling-bus';
import { GetTravellingBusByIdProvider } from './providers/get-travelling-bus-by-id.provider';
import { GetTravellingBusProvider } from './providers/get-travelling-bus.provider';
import { TravellingBusService } from './providers/travelling-bus.service';
import { TravellingBusController } from './travelling-bus.controller';
import { TravellingBus } from './travelling-bus.entity';
import { UpdateTravellingBusProvider } from './providers/update-travelling-bus.provider';

@Module({
  controllers: [TravellingBusController],
  providers: [
    TravellingBusService,
    CreateTravellingBusProvider,
    GetTravellingBusProvider,
    GetTravellingBusByIdProvider,
    UpdateTravellingBusProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([TravellingBus, Route]),
    PaginationModule,
    RoutesModule,
  ],
  exports: [TravellingBusService],
})
export class TravellingBusModule {}

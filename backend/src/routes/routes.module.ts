import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateNewRouteProvider } from './providers/create-new-route.provider';
import { GetAllRoutesProvider } from './providers/get-all-routes.provider';
import { GetRouteByIdProvider } from './providers/get-route-by-id.provider';
import { RoutesService } from './providers/routes.service';
import { Route } from './route.entity';
import { RoutesController } from './routes.controller';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
    CreateNewRouteProvider,
    GetRouteByIdProvider,
    GetAllRoutesProvider,
  ],
  imports: [TypeOrmModule.forFeature([Route]), PaginationModule],
})
export class RoutesModule {}

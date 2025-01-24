import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { ProvidersService } from './providers/providers.service';

@Module({
  controllers: [RoutesController],
  providers: [ProvidersService]
})
export class RoutesModule {}

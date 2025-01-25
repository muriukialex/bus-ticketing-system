import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravellingBusModule } from 'src/travelling-bus/travelling-bus.module';
import { UserModule } from 'src/user/user.module';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingService } from './providers/booking.service';
import { CreateBookingProvider } from './providers/create-booking.provider';

@Module({
  controllers: [BookingController],
  providers: [BookingService, CreateBookingProvider],
  exports: [BookingService],
  imports: [
    TypeOrmModule.forFeature([Booking]),
    TravellingBusModule,
    UserModule,
  ],
})
export class BookingModule {}

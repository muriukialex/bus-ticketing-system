import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingService } from './providers/booking.service';

@Controller('booking')
export class BookingController {
  constructor(
    /**
     * Inject BookingService
     */
    private readonly bookingService: BookingService,
  ) {}
  @Post()
  public createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }
}

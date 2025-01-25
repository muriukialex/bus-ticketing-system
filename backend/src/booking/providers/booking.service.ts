import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { CreateBookingProvider } from './create-booking.provider';

@Injectable()
export class BookingService {
  constructor(
    /**
     * Inject createBookingProvider
     */
    private readonly createBookingProvider: CreateBookingProvider,
  ) {}
  public async createBooking(createBooking: CreateBookingDto) {
    return this.createBookingProvider.createBooking(createBooking);
  }
}

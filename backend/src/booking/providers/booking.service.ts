import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { GetUserBookingsParamDto } from '../dtos/get-user-bookings-param.dto';
import { CreateBookingProvider } from './create-booking.provider';
import { FindUserBookingsProvider } from './find-user-bookings.provider';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';

@Injectable()
export class BookingService {
  constructor(
    /**
     * Inject createBookingProvider
     */
    private readonly createBookingProvider: CreateBookingProvider,

    /**
     * Inject findUserBookingProvider
     */
    private readonly findUserBookingsProvider: FindUserBookingsProvider,
  ) {}
  public async createBooking(createBooking: CreateBookingDto) {
    return this.createBookingProvider.createBooking(createBooking);
  }

  public async getUserBookings(
    getUserBookingsQuery: PaginationQueryDto,
    getUserBookingsParamDto: GetUserBookingsParamDto,
  ) {
    return this.findUserBookingsProvider.getUserBookings(
      getUserBookingsQuery,
      getUserBookingsParamDto,
    );
  }
}

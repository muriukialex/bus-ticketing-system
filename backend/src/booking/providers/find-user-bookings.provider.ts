import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { GetUserBookingsParamDto } from '../dtos/get-user-bookings-param.dto';

@Injectable()
export class FindUserBookingsProvider {
  constructor(
    /**
     * Inject bookingRepository
     */
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    /**
     * Inject paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async getUserBookings(
    getUserBookingsQuery: PaginationQueryDto,
    getUserBookingsParamDto: GetUserBookingsParamDto,
  ) {
    let bookings = null;

    try {
      const additionalParams = { user: { id: getUserBookingsParamDto.id } };

      bookings = await this.paginationProvider.paginateQuery(
        getUserBookingsQuery,
        this.bookingRepository,
        additionalParams,
      );
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    return bookings;
  }
}

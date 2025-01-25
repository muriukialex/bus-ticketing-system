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
import { CreateBookingDto } from './dtos/create-booking.dto';
import { GetUserBookingsParamDto } from './dtos/get-user-bookings-param.dto';
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

  @Get('user/:id')
  public getUserBookings(
    @Param() getUserBookingsParamDto: GetUserBookingsParamDto,
    @Query('per', new DefaultValuePipe(10), ParseIntPipe) per: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const getUserBookingsQuery: PaginationQueryDto = {
      per,
      page,
    };
    return this.bookingService.getUserBookings(
      getUserBookingsQuery,
      getUserBookingsParamDto,
    );
  }
}

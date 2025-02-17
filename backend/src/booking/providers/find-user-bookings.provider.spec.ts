import { RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Route } from 'src/routes/route.entity';
import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { BookingStatus } from '../enums/booking-status.enum';
import { FindUserBookingsProvider } from './find-user-bookings.provider';

describe('FindUserBookingsProvider', () => {
  let provider: FindUserBookingsProvider;
  let paginationProvider: PaginationProvider;
  let bookingRepository: jest.Mocked<Repository<Booking>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserBookingsProvider,
        {
          provide: PaginationProvider,
          useValue: {
            paginateQuery: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Booking),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<FindUserBookingsProvider>(FindUserBookingsProvider);
    paginationProvider = module.get<PaginationProvider>(PaginationProvider);
    bookingRepository = module.get(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get all user bookings successfully', async () => {
    const mockUser: User = {
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'hashed_password',
    } as User;
    const mockRoute: Route = {
      origin: 'Nairobi',
      destination: 'Bungoma',
      distance: 315,
    } as Route;

    const mockTravellingBus: TravellingBus = {
      id: 10,
      busName: 'KAV321G',
      busSeats: 30,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 1750,
      seats: ['1A', '1C'],
      route: mockRoute,
    } as TravellingBus;
    const mockUserBookings: PaginationInterface<Booking> = {
      data: [
        {
          bookingStatus: BookingStatus.BOOKED,
          id: 10,
          seatNumbers: [],
          timeBooked: new Date(),
          user: mockUser,
          travellingBus: mockTravellingBus,
        },
      ],
      meta: {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems: 1,
        totalPages: 1,
      },
      links: {
        first: '',
        last: '',
        current: '',
        next: '',
        previous: '',
      },
    };
    (paginationProvider.paginateQuery as jest.Mock).mockResolvedValue(
      mockUserBookings,
    );

    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      per: 10,
    };
    const result = await provider.getUserBookings(mockPaginationQuery, {
      id: 10,
    });

    expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
      mockPaginationQuery,
      bookingRepository,
      { user: { id: 10 } },
    );
    expect(result).toEqual(mockUserBookings);
  });

  it('should throw RequestTimeoutException if failed to get user bookings', async () => {
    (paginationProvider.paginateQuery as jest.Mock).mockRejectedValue(
      new Error('Error fetching user bookings'),
    );

    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      per: 10,
    };

    expect(
      provider.getUserBookings(mockPaginationQuery, {
        id: 10,
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });
});

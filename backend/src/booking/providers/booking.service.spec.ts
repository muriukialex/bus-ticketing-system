import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { Route } from 'src/routes/route.entity';
import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { User } from 'src/user/user.entity';
import { Booking } from '../booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingService } from './booking.service';
import { CreateBookingProvider } from './create-booking.provider';
import { FindUserBookingsProvider } from './find-user-bookings.provider';

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

const mockBooking = {
  bookingStatus: BookingStatus.BOOKED,
  id: 10,
  seatNumbers: [],
  timeBooked: new Date(),
  user: mockUser,
  travellingBus: mockTravellingBus,
};

const mockGetUserBooking = {
  data: [
    {
      id: 13,
      seatNumbers: ['2C', '2D'],
      timeBooked: '2025-01-29T18:12:04.542Z',
      bookingStatus: BookingStatus.BOOKED,
      user: mockUser,
      travellingBus: mockTravellingBus,
    },
  ],
  meta: {
    totalItems: 1,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
  },
  links: {
    first: 'http://localhost:3000+/booking/user/1?per10&page=1',
    last: 'http://localhost:3000+/booking/user/1?per10&page=1',
    current: 'http://localhost:3000+/booking/user/1?per10&page=1',
    next: 'http://localhost:3000+/booking/user/1?per10&page=null',
    previous: 'http://localhost:3000+/booking/user/1?per10&page=null',
  },
};

describe('BookingService', () => {
  let service: BookingService;

  const MockCreateBookingProvider = {
    createBooking: () => {
      return Promise.resolve<Booking>(mockBooking);
    },
  };

  const MockFindUserBookingsProvider = {
    getUserBookings: () => {
      return Promise.resolve(mockGetUserBooking);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: CreateBookingProvider,
          useValue: MockCreateBookingProvider,
        },
        {
          provide: FindUserBookingsProvider,
          useValue: MockFindUserBookingsProvider,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBooking', () => {
    it('should test createBooking method on CreateBookingProvider', async () => {
      const createBookingDto: CreateBookingDto = {
        userId: 10,
        seatNumbers: [],
        travellingBusId: 10,
      };

      const booking: Booking = await service.createBooking(createBookingDto);
      expect(booking).toEqual(expect.objectContaining(mockBooking));
      expect(booking.user).toEqual(expect.objectContaining(mockUser));
      expect(booking.travellingBus).toEqual(
        expect.objectContaining(mockTravellingBus),
      );
    });
  });

  describe('getUserBookings', () => {
    it('should test getUserBookings method on FindUserBookingsProvider', async () => {
      const userBookings: PaginationInterface<Booking> =
        await service.getUserBookings({ page: 1, per: 10 }, { id: 10 });

      expect(userBookings).toEqual(expect.objectContaining(mockGetUserBooking));
    });
  });
});

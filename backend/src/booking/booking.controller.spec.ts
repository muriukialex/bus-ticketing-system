import { Test, TestingModule } from '@nestjs/testing';
import { Route } from 'src/routes/route.entity';
import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { User } from 'src/user/user.entity';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingStatus } from './enums/booking-status.enum';
import { BookingService } from './providers/booking.service';

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: jest.Mocked<BookingService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            createBooking: jest.fn(),
            getUserBookings: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get(BookingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test createBooking method', async () => {
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
    const mockBooking: Booking = {
      bookingStatus: BookingStatus.BOOKED,
      id: 10,
      seatNumbers: [],
      timeBooked: new Date(),
      user: mockUser,
      travellingBus: mockTravellingBus,
    };
    bookingService.createBooking.mockResolvedValue(mockBooking);

    const createBookingDto = {
      userId: 10,
      travellingBusId: 10,
      seatNumbers: ['1A', '1B'],
    };

    const result = await controller.createBooking(createBookingDto);
    expect(result).toEqual(expect.objectContaining(mockBooking));
  });

  it('should test getUserBookings method', async () => {
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
    const mockBooking: Booking = {
      id: 10,
      seatNumbers: ['2C', '2D'],
      timeBooked: new Date(),
      bookingStatus: BookingStatus.BOOKED,
      user: mockUser,
      travellingBus: mockTravellingBus,
    };
    const mockGetUserBooking = {
      data: [mockBooking],
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
    bookingService.getUserBookings.mockResolvedValue(mockGetUserBooking);

    const result = await controller.getUserBookings(
      {
        id: 10,
      },
      10, // per
      1, // page
    );
    expect(result).toEqual(expect.objectContaining(mockGetUserBooking));
  });
});

import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Route } from 'src/routes/route.entity';
import { TravellingBusService } from 'src/travelling-bus/providers/travelling-bus.service';
import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { UserService } from 'src/user/providers/user.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { BookingStatus } from '../enums/booking-status.enum';
import { CreateBookingProvider } from './create-booking.provider';

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

describe('CreateBookingProvider', () => {
  let service: CreateBookingProvider;
  let bookingRepository: jest.Mocked<Repository<Booking>>;
  let travellingBusService: jest.Mocked<TravellingBusService>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookingProvider,
        {
          provide: getRepositoryToken(Booking),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: TravellingBusService,
          useValue: {
            getTravellingBusById: jest.fn(),
            updateTravellingBus: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateBookingProvider>(CreateBookingProvider);
    bookingRepository = module.get(getRepositoryToken(Booking));
    travellingBusService = module.get(TravellingBusService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create booking successfully', async () => {
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

    travellingBusService.getTravellingBusById.mockResolvedValue(
      mockTravellingBus,
    );
    userService.findUserById.mockResolvedValue(mockUser);
    bookingRepository.create.mockReturnValue(mockBooking);
    bookingRepository.save.mockResolvedValue(mockBooking);

    const createBookingDto: CreateBookingDto = {
      userId: 10,
      seatNumbers: ['1A'],
      travellingBusId: 10,
    };
    const result = await service.createBooking(createBookingDto);
    expect(result).toEqual(mockBooking);
    expect(result.travellingBus.busSeats).toEqual(mockTravellingBus.busSeats);
  });

  it('should throw BadRequestException if bus seats to book are less than 1', () => {
    const mockTravellingBus2: TravellingBus = {
      id: 10,
      busName: 'KAV321G',
      busSeats: 0,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 1750,
      seats: [],
      route: mockRoute,
    } as TravellingBus;
    travellingBusService.getTravellingBusById.mockResolvedValue(
      mockTravellingBus2,
    );
    userService.findUserById.mockResolvedValue(mockUser);

    const createBookingDto: CreateBookingDto = {
      userId: 10,
      seatNumbers: ['1A'],
      travellingBusId: 10,
    };
    expect(service.createBooking(createBookingDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if bus seat to book does not exist', () => {
    const mockTravellingBus2: TravellingBus = {
      id: 10,
      busName: 'KAV321G',
      busSeats: 30,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 1750,
      seats: ['1A', '1B'],
      route: mockRoute,
    } as TravellingBus;
    travellingBusService.getTravellingBusById.mockResolvedValue(
      mockTravellingBus2,
    );
    userService.findUserById.mockResolvedValue(mockUser);

    const createBookingDto: CreateBookingDto = {
      userId: 10,
      seatNumbers: ['1D'],
      travellingBusId: 10,
    };
    expect(service.createBooking(createBookingDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw RequestTimeoutException if failed to save new booking', () => {
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

    travellingBusService.getTravellingBusById.mockResolvedValue(
      mockTravellingBus,
    );
    userService.findUserById.mockResolvedValue(mockUser);
    bookingRepository.create.mockReturnValue(mockBooking);
    bookingRepository.save.mockRejectedValue(new RequestTimeoutException());

    const createBookingDto: CreateBookingDto = {
      userId: 10,
      seatNumbers: ['1A'],
      travellingBusId: 10,
    };
    expect(service.createBooking(createBookingDto)).rejects.toThrow(
      RequestTimeoutException,
    );
  });
});

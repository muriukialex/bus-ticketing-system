import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { Route } from 'src/routes/route.entity';
import { TravellingBusService } from './providers/travelling-bus.service';
import { TravellingBusController } from './travelling-bus.controller';
import { TravellingBus } from './travelling-bus.entity';

describe('TravellingBusController', () => {
  let controller: TravellingBusController;
  let travellingBusService: jest.Mocked<TravellingBusService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravellingBusController],
      providers: [
        {
          provide: TravellingBusService,
          useValue: {
            getTravellingBusById: jest.fn(),
            getAllTravellingBuses: jest.fn(),
            createTravellingBus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TravellingBusController>(TravellingBusController);
    travellingBusService = module.get(TravellingBusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test getTravellingBuses method', async () => {
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
    const mockTravellingBuses: PaginationInterface<TravellingBus> = {
      data: [mockTravellingBus],
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

    travellingBusService.getAllTravellingBuses.mockResolvedValue(
      mockTravellingBuses,
    );

    const result = await controller.getTravellingBuses(
      {
        id: undefined,
      },
      10, // per
      1, // page
      'Nairobi', // origin
      'Bungoma', //destination
    );
    expect(result).toEqual(expect.objectContaining(mockTravellingBuses));
  });

  it('should test getTravellingBuses method using a travelling bus id', async () => {
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

    travellingBusService.getTravellingBusById.mockResolvedValue(
      mockTravellingBus,
    );

    const result = await controller.getTravellingBuses(
      {
        id: 10,
      },
      10, // per
      1, // page
      'Nairobi', // origin
      'Bungoma', //destination
    );
    expect(result).toEqual(expect.objectContaining(mockTravellingBus));
  });

  it('should test createTravellingBus method', async () => {
    const mockTravellingBus = {
      routeId: 1,
      busName: 'KBC001A',
      busSeats: 45,
      seats: ['1A'],
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 1750,
    };

    const mockCreatedTravellingBus: TravellingBus = {
      ...mockTravellingBus,
      id: 10,
    };

    travellingBusService.createTravellingBus.mockResolvedValue(
      mockCreatedTravellingBus,
    );

    const result = await controller.createTravellingBus(mockTravellingBus);
    expect(result).toEqual(expect.objectContaining(mockCreatedTravellingBus));
  });
});

import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoutesService } from 'src/routes/providers/routes.service';
import { Route } from 'src/routes/route.entity';
import { Repository } from 'typeorm';
import { CreateTravellingBusDto } from '../dtos/create-travelling-bus.dto';
import { TravellingBus } from '../travelling-bus.entity';
import { CreateTravellingBusProvider } from './create-travelling-bus';

describe('CreateTravellingBusProvider', () => {
  let provider: CreateTravellingBusProvider;
  let routeService: jest.Mocked<RoutesService>;
  let travellingBusesRepository: jest.Mocked<Repository<TravellingBus>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTravellingBusProvider,
        {
          provide: RoutesService,
          useValue: {
            getRouteById: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TravellingBus),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<CreateTravellingBusProvider>(
      CreateTravellingBusProvider,
    );
    routeService = module.get(RoutesService);
    travellingBusesRepository = module.get(getRepositoryToken(TravellingBus));
  });

  it('should create and return a travelling bus successfully', async () => {
    const dto: CreateTravellingBusDto = {
      routeId: 1,
      busName: 'KAV221P',
      busSeats: 45,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 2500,
      seats: ['1A'],
    };
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

    routeService.getRouteById.mockResolvedValue(mockRoute);
    travellingBusesRepository.create.mockReturnValue(mockTravellingBus);
    travellingBusesRepository.save.mockResolvedValue(mockTravellingBus);

    const result = await provider.createTravellingBus(dto);

    expect(routeService.getRouteById).toHaveBeenCalledWith(dto.routeId);
    expect(travellingBusesRepository.create).toHaveBeenCalledWith({
      ...dto,
      route: mockRoute,
    });
    expect(travellingBusesRepository.save).toHaveBeenCalledWith(
      mockTravellingBus,
    );
    expect(result).toEqual(mockTravellingBus);
  });

  it('should throw BadRequestException if the route does not exist', async () => {
    const dto: CreateTravellingBusDto = {
      routeId: 1,
      busName: 'KAV221P',
      busSeats: 45,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 2500,
      seats: ['1A'],
    };

    routeService.getRouteById.mockResolvedValue(null);

    await expect(provider.createTravellingBus(dto)).rejects.toThrow(
      BadRequestException,
    );
    expect(routeService.getRouteById).toHaveBeenCalledWith(dto.routeId);
    expect(travellingBusesRepository.create).not.toHaveBeenCalled();
    expect(travellingBusesRepository.save).not.toHaveBeenCalled();
  });

  it('should throw RequestTimeoutException if saving the bus fails', async () => {
    const dto: CreateTravellingBusDto = {
      routeId: 1,
      busName: 'KAV221P',
      busSeats: 45,
      departureTime: new Date(),
      arrivalTime: new Date(),
      priceOfTrip: 2500,
      seats: ['1A'],
    };
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

    routeService.getRouteById.mockResolvedValue(mockRoute);
    travellingBusesRepository.create.mockReturnValue(mockTravellingBus);
    travellingBusesRepository.save.mockRejectedValue(
      new Error('Database Error'),
    );

    await expect(provider.createTravellingBus(dto)).rejects.toThrow(
      RequestTimeoutException,
    );
    expect(routeService.getRouteById).toHaveBeenCalledWith(dto.routeId);
    expect(travellingBusesRepository.create).toHaveBeenCalledWith({
      ...dto,
      route: mockRoute,
    });
    expect(travellingBusesRepository.save).toHaveBeenCalledWith(
      mockTravellingBus,
    );
  });
});

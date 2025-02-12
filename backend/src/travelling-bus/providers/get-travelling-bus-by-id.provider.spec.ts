import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Route } from 'src/routes/route.entity';
import { Repository } from 'typeorm';
import { TravellingBus } from '../travelling-bus.entity';
import { GetTravellingBusByIdProvider } from './get-travelling-bus-by-id.provider';

describe('GetTravellingBusByIdProvider', () => {
  let provider: GetTravellingBusByIdProvider;
  let travellingBusRepository: jest.Mocked<Repository<TravellingBus>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTravellingBusByIdProvider,
        {
          provide: getRepositoryToken(TravellingBus),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<GetTravellingBusByIdProvider>(
      GetTravellingBusByIdProvider,
    );
    travellingBusRepository = module.get(getRepositoryToken(TravellingBus));
  });

  it('should get travelling bus by id successfully', async () => {
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

    travellingBusRepository.findOneBy.mockResolvedValue(mockTravellingBus);
    const result = await provider.getTravellingBusById(10);
    expect(result).toEqual(mockTravellingBus);
  });

  it('should throw RequestTimeoutException if error occurs finding bus by id', () => {
    travellingBusRepository.findOneBy.mockRejectedValue(
      new Error('Error fetching bus'),
    );
    expect(provider.getTravellingBusById(10)).rejects.toThrow(
      RequestTimeoutException,
    );
  });

  it('should throw BadRequestException if no bus is found by id', () => {
    travellingBusRepository.findOneBy.mockResolvedValue(null);
    expect(provider.getTravellingBusById(10)).rejects.toThrow(
      BadRequestException,
    );
  });
});

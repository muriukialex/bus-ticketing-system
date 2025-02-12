import { RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Route } from 'src/routes/route.entity';
import { Repository } from 'typeorm';
import { PatchTravellingBusDto } from '../dtos/patch-travelling-bus.dto';
import { TravellingBus } from '../travelling-bus.entity';
import { UpdateTravellingBusProvider } from './update-travelling-bus.provider';

describe('UpdateTravellingBusProvider', () => {
  let provider: UpdateTravellingBusProvider;
  let travellingBusRepository: jest.Mocked<Repository<TravellingBus>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTravellingBusProvider,
        {
          provide: getRepositoryToken(TravellingBus),
          useValue: {
            findOneBy: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<UpdateTravellingBusProvider>(
      UpdateTravellingBusProvider,
    );
    travellingBusRepository = module.get(getRepositoryToken(TravellingBus));
  });

  it('should update travelling bus details successfully', async () => {
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

    const patchTravellingBusDto: PatchTravellingBusDto = {
      id: 10,
      busName: 'KBS123P',
    };
    travellingBusRepository.findOneBy.mockResolvedValue(mockTravellingBus);
    travellingBusRepository.save.mockResolvedValue({
      ...mockTravellingBus,
      busName: patchTravellingBusDto.busName,
    });

    const result = await provider.updateTravellingBus(patchTravellingBusDto);
    expect(result.busName).toEqual(patchTravellingBusDto.busName);
  });

  it('should throw RequestTimeoutException if failed to find bus by id', () => {
    travellingBusRepository.findOneBy.mockRejectedValue(
      new Error('Error updating bus'),
    );

    expect(
      provider.updateTravellingBus({
        id: 10,
        busName: 'KBS123P',
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });

  it('should throw RequestTimeoutException if failed to save bus details', async () => {
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
    travellingBusRepository.save.mockRejectedValue(
      new Error('Error saving bus'),
    );

    expect(
      provider.updateTravellingBus({
        id: 10,
        busName: 'KBS123P',
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });
});

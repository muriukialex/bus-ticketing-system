import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../route.entity';
import { CreateNewRouteProvider } from './create-new-route.provider';

describe('CreateNewRouteProvider', () => {
  let provider: CreateNewRouteProvider;
  let routeRepository: jest.Mocked<Repository<Route>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateNewRouteProvider,
        {
          provide: getRepositoryToken(Route),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<CreateNewRouteProvider>(CreateNewRouteProvider);
    routeRepository = module.get(getRepositoryToken(Route));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create and return a route successfully', async () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };
    routeRepository.findOne.mockResolvedValue(null);
    routeRepository.create.mockReturnValue(mockRoute);
    routeRepository.save.mockResolvedValue(mockRoute);

    const result = await provider.createNewRoute(mockRoute);
    expect(result).toEqual(mockRoute);
  });

  it('should throw RequestTimeoutException when findOne has an error', () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };
    routeRepository.findOne.mockRejectedValue(new Error());

    expect(provider.createNewRoute(mockRoute)).rejects.toThrow(
      RequestTimeoutException,
    );
  });

  it('should throw BadRequestException when trying to create an existing route', () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };
    routeRepository.findOne.mockResolvedValue(mockRoute);

    expect(provider.createNewRoute(mockRoute)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw RequestTimeoutException when trying to save an existing route', () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };

    routeRepository.findOne.mockResolvedValue(null);
    routeRepository.create.mockReturnValue(mockRoute);
    routeRepository.save.mockRejectedValue(new Error());

    expect(provider.createNewRoute(mockRoute)).rejects.toThrow(
      RequestTimeoutException,
    );
  });
});

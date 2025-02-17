import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../route.entity';
import { GetRouteByIdProvider } from './get-route-by-id.provider';

describe('GetRouteByIdProvider', () => {
  let provider: GetRouteByIdProvider;
  let routeRepository: jest.Mocked<Repository<Route>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRouteByIdProvider,
        {
          provide: getRepositoryToken(Route),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<GetRouteByIdProvider>(GetRouteByIdProvider);
    routeRepository = module.get(getRepositoryToken(Route));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get travelling bus by id successfully', async () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };

    routeRepository.findOneBy.mockResolvedValue(mockRoute);
    const result = await provider.getRouteById(10);
    expect(result).toEqual(mockRoute);
  });

  it('should throw RequestTimeoutException if an error is returned by findOneBy', () => {
    routeRepository.findOneBy.mockRejectedValue(
      new Error('Error fetching route'),
    );
    expect(provider.getRouteById(10)).rejects.toThrow(RequestTimeoutException);
  });

  it("should throw BadRequestException if there's no route with id specified", async () => {
    routeRepository.findOneBy.mockResolvedValue(null);
    expect(provider.getRouteById(10)).rejects.toThrow(BadRequestException);
  });
});

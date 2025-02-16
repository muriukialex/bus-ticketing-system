import { RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { Route } from '../route.entity';
import { GetAllRoutesProvider } from './get-all-routes.provider';

describe('GetAllRoutesProvider', () => {
  let provider: GetAllRoutesProvider;
  let paginationProvider: PaginationProvider;
  let routeRepository: jest.Mocked<Repository<Route>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllRoutesProvider,
        {
          provide: PaginationProvider,
          useValue: {
            paginateQuery: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Route),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<GetAllRoutesProvider>(GetAllRoutesProvider);
    paginationProvider = module.get<PaginationProvider>(PaginationProvider);
    routeRepository = module.get(getRepositoryToken(Route));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should get all routes successfully', async () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };

    const mockUserBookings: PaginationInterface<Route> = {
      data: [mockRoute],
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
    const result = await provider.getAllRoutes(mockPaginationQuery);

    expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
      mockPaginationQuery,
      routeRepository,
    );
    expect(result).toEqual(mockUserBookings);
  });

  it('should throw RequestTimeoutException if failed to get routes', async () => {
    (paginationProvider.paginateQuery as jest.Mock).mockRejectedValue(
      new Error('Error fetching routes'),
    );

    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      per: 10,
    };

    expect(provider.getAllRoutes(mockPaginationQuery)).rejects.toThrow(
      RequestTimeoutException,
    );
  });
});

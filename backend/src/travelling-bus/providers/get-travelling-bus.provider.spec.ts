import { RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { TravellingBus } from '../travelling-bus.entity';
import { GetTravellingBusProvider } from './get-travelling-bus.provider';

describe('GetTravellingBusProvider', () => {
  let provider: GetTravellingBusProvider;
  let paginationProvider: PaginationProvider;
  let travellingBusRepository: Repository<TravellingBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTravellingBusProvider,
        {
          provide: getRepositoryToken(TravellingBus),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: PaginationProvider,
          useValue: {
            paginateQuery: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<GetTravellingBusProvider>(GetTravellingBusProvider);
    paginationProvider = module.get<PaginationProvider>(PaginationProvider);
    travellingBusRepository = module.get<Repository<TravellingBus>>(
      getRepositoryToken(TravellingBus),
    );
  });

  it('should get all travelling buses successfully', async () => {
    const mockTravellingBuses: PaginationInterface<TravellingBus> = {
      data: [
        {
          id: 1,
          busName: 'KAV321G',
          busSeats: 30,
          departureTime: undefined,
          arrivalTime: undefined,
          priceOfTrip: 0,
          seats: [],
        },
      ],
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
      mockTravellingBuses,
    );

    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      per: 10,
    };
    const result = await provider.getAllTravellingBuses(
      mockPaginationQuery,
      'Nairobi',
      'Bungoma',
    );

    expect(paginationProvider.paginateQuery).toHaveBeenCalledWith(
      mockPaginationQuery,
      travellingBusRepository,
      { route: { origin: 'Nairobi', destination: 'Bungoma' } },
    );
    expect(result).toEqual(mockTravellingBuses);
  });

  it('should throw RequestTimeoutException if paginateQuery returns an error', async () => {
    (paginationProvider.paginateQuery as jest.Mock).mockRejectedValue(
      new Error('Error fetching buses'),
    );
    const mockPaginationQuery: PaginationQueryDto = {
      page: 1,
      per: 10,
    };

    expect(
      provider.getAllTravellingBuses(mockPaginationQuery, 'Nairobi', 'Bungoma'),
    ).rejects.toThrow(RequestTimeoutException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { CreateNewRouteDto } from '../dtos/create-new-route.dto';
import { Route } from '../route.entity';
import { CreateNewRouteProvider } from './create-new-route.provider';
import { GetAllRoutesProvider } from './get-all-routes.provider';
import { GetRouteByIdProvider } from './get-route-by-id.provider';
import { RoutesService } from './routes.service';

describe('RoutesService', () => {
  const MockCreateNewRouteProvider = {
    createNewRoute: (createNewRouteDto: CreateNewRouteDto) => {
      return Promise.resolve({
        id: 1,
        origin: createNewRouteDto.origin,
        destination: createNewRouteDto.destination,
        distance: createNewRouteDto.distance,
      });
    },
  };

  const mockRoute: Route = {
    createdAt: new Date(),
    destination: 'Bungoma',
    distance: 340,
    id: 10,
    origin: 'Nairobi',
    travellingBuses: [],
  };

  const mockRoutes: PaginationInterface<Route> = {
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

  const MockGetAllRoutesProvider = {
    getAllRoutes: () => {
      return Promise.resolve<PaginationInterface<Route>>(mockRoutes);
    },
  };

  const MockGetRouteByIdProvider = {
    getRouteById: () => {
      return Promise.resolve<Route>({
        createdAt: new Date(),
        destination: 'Bungoma',
        distance: 340,
        id: 10,
        origin: 'Nairobi',
        travellingBuses: [],
      });
    },
  };

  let service: RoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        {
          provide: CreateNewRouteProvider,
          useValue: MockCreateNewRouteProvider,
        },
        {
          provide: GetAllRoutesProvider,
          useValue: MockGetAllRoutesProvider,
        },
        {
          provide: GetRouteByIdProvider,
          useValue: MockGetRouteByIdProvider,
        },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewRoute', () => {
    it('should test createNewRoute method on CreateNewRouteProvider', async () => {
      const createBookingDto: CreateNewRouteDto = {
        destination: 'Nairobi',
        distance: 340,
        origin: 'Bungoma',
      };

      const route: CreateNewRouteDto =
        await service.createNewRoute(createBookingDto);
      expect(route).toEqual(expect.objectContaining(route));
    });
  });

  describe('getAllRoutes', () => {
    it('should test getAllRoutes method on GetAllRoutesProvider', async () => {
      const mockRoutes: PaginationInterface<Route> = {
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
      const result = await service.getAllRoutes({
        page: 1,
        per: 10,
      });

      expect(result).toEqual(expect.objectContaining(mockRoutes));
    });
  });

  describe('getRouteById', () => {
    it('should test getRouteById method on GetRouteByIdProvider', async () => {
      const mockRoute: Route = {
        createdAt: new Date(),
        destination: 'Bungoma',
        distance: 340,
        id: 10,
        origin: 'Nairobi',
        travellingBuses: [],
      };

      const result = await service.getRouteById(10);
      expect(result).toEqual(expect.objectContaining(mockRoute));
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { RoutesService } from './providers/routes.service';
import { Route } from './route.entity';
import { RoutesController } from './routes.controller';

describe('RoutesController', () => {
  let controller: RoutesController;
  let routesService: jest.Mocked<RoutesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [
        {
          provide: RoutesService,
          useValue: {
            getRouteById: jest.fn(),
            getAllRoutes: jest.fn(),
            createNewRoute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoutesController>(RoutesController);
    routesService = module.get(RoutesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test getRoutes method', async () => {
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
    routesService.getAllRoutes.mockResolvedValue(mockRoutes);

    const result = await controller.getRoutes(
      {
        id: undefined,
      },
      10, // per
      1, // page
    );
    expect(result).toEqual(expect.objectContaining(mockRoutes));
  });

  it('should test getRoutes method using a route id', async () => {
    const mockRoute: Route = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };

    routesService.getRouteById.mockResolvedValue(mockRoute);

    const result = await controller.getRoutes(
      {
        id: 10,
      },
      10, // per
      1, // page
    );
    expect(result).toEqual(expect.objectContaining(mockRoute));
  });

  it('should test createNewRoute method', async () => {
    const mockRoute = {
      destination: 'Bungoma',
      distance: 340,
      origin: 'Nairobi',
    };

    const mockCreatedRoute = {
      createdAt: new Date(),
      destination: 'Bungoma',
      distance: 340,
      id: 10,
      origin: 'Nairobi',
      travellingBuses: [],
    };

    routesService.createNewRoute.mockResolvedValue(mockCreatedRoute);

    const result = await controller.createNewRoute(mockRoute);
    expect(result).toEqual(expect.objectContaining(mockCreatedRoute));
  });
});

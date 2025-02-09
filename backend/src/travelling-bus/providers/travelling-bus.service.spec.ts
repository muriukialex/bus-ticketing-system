import { Test, TestingModule } from '@nestjs/testing';
import { PaginationInterface } from 'src/common/pagination/interfaces/pagination.interface';
import { CreateTravellingBusDto } from '../dtos/create-travelling-bus.dto';
import { TravellingBus } from '../travelling-bus.entity';
import { CreateTravellingBusProvider } from './create-travelling-bus';
import { GetTravellingBusByIdProvider } from './get-travelling-bus-by-id.provider';
import { GetTravellingBusProvider } from './get-travelling-bus.provider';
import { TravellingBusService } from './travelling-bus.service';
import { UpdateTravellingBusProvider } from './update-travelling-bus.provider';

describe('TravellingBusService', () => {
  let service: TravellingBusService;
  const MockCreateTravellingBusProvider = {
    createTravellingBus: (createTravellingBusDto: CreateTravellingBusDto) => {
      return Promise.resolve({
        id: 1,
        busName: createTravellingBusDto.busName,
        busSeats: createTravellingBusDto.busSeats,
        departureTime: createTravellingBusDto.departureTime,
        arrivalTime: createTravellingBusDto.arrivalTime,
        priceOfTrip: createTravellingBusDto.priceOfTrip,
        seats: createTravellingBusDto.seats,
      });
    },
  };

  const MockGetTravellingBusProvider = {
    getAllTravellingBuses: () => {
      return Promise.resolve<PaginationInterface<TravellingBus>>({
        data: [],
        meta: {
          itemsPerPage: 10,
          totalItems: 0,
          currentPage: 1,
          totalPages: 0,
        },
        links: {
          first: '',
          last: '',
          current: '',
          next: '',
          previous: '',
        },
      });
    },
  };

  const MockGetTravellingBusByIdProvider = {
    getTravellingBusById: () => {
      return Promise.resolve<TravellingBus>({
        id: 1,
        busName: 'KAV221P',
        busSeats: 45,
        departureTime: new Date(),
        arrivalTime: new Date(),
        priceOfTrip: 2500,
        seats: ['1A'],
      });
    },
  };

  const MockUpdateTravellingBusProvider = {
    updateTravellingBus: () => {
      return Promise.resolve({
        id: 1,
        busName: 'KBC001',
      });
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravellingBusService,
        {
          provide: CreateTravellingBusProvider,
          useValue: MockCreateTravellingBusProvider,
        },
        {
          provide: GetTravellingBusProvider,
          useValue: MockGetTravellingBusProvider,
        },
        {
          provide: GetTravellingBusByIdProvider,
          useValue: MockGetTravellingBusByIdProvider,
        },
        {
          provide: UpdateTravellingBusProvider,
          useValue: MockUpdateTravellingBusProvider,
        },
      ],
    }).compile();

    service = module.get<TravellingBusService>(TravellingBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTravellingBus', () => {
    it('should call createTravellingBus method on CreateTravellingBusProvider', async () => {
      const createTravellingBusDto = {
        routeId: 1,
        busName: 'KAV221P',
        busSeats: 45,
        departureTime: new Date(),
        arrivalTime: new Date(),
        priceOfTrip: 2500,
        seats: ['1A'],
      };
      const travellingBus = await service.createTravellingBus(
        createTravellingBusDto,
      );

      expect(travellingBus.busName).toEqual('KAV221P');
      expect(travellingBus.busSeats).toEqual(45);
      expect(travellingBus.priceOfTrip).toEqual(2500);
      expect(travellingBus.seats).toEqual(['1A']);
    });
  });

  describe('getAllTravellingBuses', () => {
    it('should call getAllTravellingBuses service on GetTravellingBusProvider', async () => {
      const travellingBuses = await service.getAllTravellingBuses({
        page: 1,
        per: 5,
      });
      expect(travellingBuses.data).toEqual(expect.objectContaining([]));
      expect(travellingBuses.links).toEqual(
        expect.objectContaining({
          first: '',
          last: '',
          current: '',
          next: '',
          previous: '',
        }),
      );
      expect(travellingBuses.meta).toEqual(
        expect.objectContaining({
          itemsPerPage: 10,
          totalItems: 0,
          currentPage: 1,
          totalPages: 0,
        }),
      );
    });
  });

  describe('getTravellingBusById', () => {
    it('should call getTravellingBusById service on GetTravellingBusByIdProvider', async () => {
      const travellingBus = await service.getTravellingBusById(1);
      expect(travellingBus.busName).toEqual('KAV221P');
      expect(travellingBus.busSeats).toEqual(45);
      expect(travellingBus.priceOfTrip).toEqual(2500);
      expect(travellingBus.seats).toEqual(['1A']);
    });
  });

  describe('updateTravellingBus', () => {
    it('should call updateTravellingBus service on UpdateTravellingBusProvider', async () => {
      const updatedTravellingBus = await service.updateTravellingBus({
        id: 1,
        busName: 'KBC001',
      });

      expect(updatedTravellingBus.busName).toEqual('KBC001');
    });
  });
});

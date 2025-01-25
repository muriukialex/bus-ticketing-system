import { Test, TestingModule } from '@nestjs/testing';
import { TravellingBusService } from './travelling-bus.service';

describe('TravellingBusService', () => {
  let service: TravellingBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravellingBusService],
    }).compile();

    service = module.get<TravellingBusService>(TravellingBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

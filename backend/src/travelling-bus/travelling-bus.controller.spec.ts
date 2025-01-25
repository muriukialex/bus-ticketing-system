import { Test, TestingModule } from '@nestjs/testing';
import { TravellingBusController } from './travelling-bus.controller';

describe('TravellingBusController', () => {
  let controller: TravellingBusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravellingBusController],
    }).compile();

    controller = module.get<TravellingBusController>(TravellingBusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

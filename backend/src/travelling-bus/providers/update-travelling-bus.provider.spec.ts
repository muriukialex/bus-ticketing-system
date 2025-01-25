import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTravellingBusProvider } from './update-travelling-bus.provider';

describe('UpdateTravellingBusProvider', () => {
  let provider: UpdateTravellingBusProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTravellingBusProvider],
    }).compile();

    provider = module.get<UpdateTravellingBusProvider>(UpdateTravellingBusProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

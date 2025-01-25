import { Test, TestingModule } from '@nestjs/testing';
import { GetTravellingBusProvider } from './get-travelling-bus.provider';

describe('GetTravellingBusProvider', () => {
  let provider: GetTravellingBusProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTravellingBusProvider],
    }).compile();

    provider = module.get<GetTravellingBusProvider>(GetTravellingBusProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GetTravellingBusByIdProvider } from './get-travelling-bus-by-id.provider';

describe('GetTravellingBusByIdProvider', () => {
  let provider: GetTravellingBusByIdProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTravellingBusByIdProvider],
    }).compile();

    provider = module.get<GetTravellingBusByIdProvider>(GetTravellingBusByIdProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

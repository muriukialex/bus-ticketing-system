import { Test, TestingModule } from '@nestjs/testing';
import { GetRouteByIdProvider } from './get-route-by-id.provider';

describe('GetRouteByIdProvider', () => {
  let provider: GetRouteByIdProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetRouteByIdProvider],
    }).compile();

    provider = module.get<GetRouteByIdProvider>(GetRouteByIdProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

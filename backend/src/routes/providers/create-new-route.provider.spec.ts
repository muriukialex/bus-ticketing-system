import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewRouteProvider } from './create-new-route.provider';

describe('CreateNewRouteProvider', () => {
  let provider: CreateNewRouteProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateNewRouteProvider],
    }).compile();

    provider = module.get<CreateNewRouteProvider>(CreateNewRouteProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

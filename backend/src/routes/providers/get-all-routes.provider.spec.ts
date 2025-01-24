import { Test, TestingModule } from '@nestjs/testing';
import { GetAllRoutesProvider } from './get-all-routes.provider';

describe('GetAllRoutesProvider', () => {
  let provider: GetAllRoutesProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllRoutesProvider],
    }).compile();

    provider = module.get<GetAllRoutesProvider>(GetAllRoutesProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

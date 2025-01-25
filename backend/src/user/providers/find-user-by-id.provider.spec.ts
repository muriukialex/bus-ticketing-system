import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdProvider } from './find-user-by-id.provider';

describe('FindUserByIdProvider', () => {
  let provider: FindUserByIdProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByIdProvider],
    }).compile();

    provider = module.get<FindUserByIdProvider>(FindUserByIdProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

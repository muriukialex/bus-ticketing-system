import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

describe('FindUserByEmailProvider', () => {
  let provider: FindUserByEmailProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserByEmailProvider],
    }).compile();

    provider = module.get<FindUserByEmailProvider>(FindUserByEmailProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FindUserBookingsProvider } from './find-user-bookings.provider';

describe('FindUserBookingsProvider', () => {
  let provider: FindUserBookingsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindUserBookingsProvider],
    }).compile();

    provider = module.get<FindUserBookingsProvider>(FindUserBookingsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

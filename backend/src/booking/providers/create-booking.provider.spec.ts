import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookingProvider } from './create-booking.provider';

describe('CreateBookingProvider', () => {
  let service: CreateBookingProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBookingProvider],
    }).compile();

    service = module.get<CreateBookingProvider>(CreateBookingProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

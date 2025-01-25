import { Test, TestingModule } from '@nestjs/testing';
import { CreateTravellingBusProvider } from './create-travelling-bus';

describe('CreateTravellingBusProvider', () => {
  let provider: CreateTravellingBusProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTravellingBusProvider],
    }).compile();

    provider = module.get<CreateTravellingBusProvider>(
      CreateTravellingBusProvider,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

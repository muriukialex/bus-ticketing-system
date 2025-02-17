import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { FindUserByIdProvider } from './find-user-by-id.provider';

describe('FindUserByIdProvider', () => {
  let provider: FindUserByIdProvider;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdProvider,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<FindUserByIdProvider>(FindUserByIdProvider);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should find existing user by id', async () => {
    const mockUser: User = {
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'hashed_password',
    } as User;

    userRepository.findOneBy.mockResolvedValue(mockUser);

    const result = await provider.findUserById(10);
    expect(result).toEqual(
      expect.objectContaining({
        bookings: [],
        email: 'john@gmail.com',
        firstName: 'John',
        id: 10,
        joinedOn: result.joinedOn,
        lastName: 'Doe',
        password: 'hashed_password',
      }),
    );
  });

  it('should throw RequestTimeoutException if findOneBy user by id has an error', async () => {
    userRepository.findOneBy.mockRejectedValue(new Error());

    expect(provider.findUserById(10)).rejects.toThrow(RequestTimeoutException);
  });

  it('should throw UnauthorizedException if no user is found by id', async () => {
    userRepository.findOneBy.mockResolvedValue(null);

    expect(provider.findUserById(10)).rejects.toThrow(UnauthorizedException);
  });
});

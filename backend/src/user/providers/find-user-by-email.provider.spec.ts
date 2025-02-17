import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

describe('FindUserByEmailProvider', () => {
  let provider: FindUserByEmailProvider;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailProvider,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<FindUserByEmailProvider>(FindUserByEmailProvider);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should find existing user by email', async () => {
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

    const result = await provider.findUserByEmail('john@gmail.com');
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

  it('should throw RequestTimeoutException if findOneBy user by email has an error', async () => {
    userRepository.findOneBy.mockRejectedValue(new Error());

    expect(provider.findUserByEmail('john@gmail.com')).rejects.toThrow(
      RequestTimeoutException,
    );
  });

  it('should throw UnauthorizedException if no user is found by email', async () => {
    userRepository.findOneBy.mockResolvedValue(null);

    expect(provider.findUserByEmail('john@gmail.com')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

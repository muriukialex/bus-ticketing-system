import { BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from './hashing.provider';
import { SignUpProvider } from './sign-up.provider';

describe('SignUpProvider', () => {
  let provider: SignUpProvider;
  let hashingProvider: jest.Mocked<HashingProvider>;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpProvider,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<SignUpProvider>(SignUpProvider);
    hashingProvider = module.get(HashingProvider);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should sign up user successfully', async () => {
    userRepository.findOne.mockResolvedValue(null);
    hashingProvider.hashPassword.mockResolvedValue('hashed_password');
    userRepository.save.mockResolvedValue({
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'password',
    });

    const result = await provider.signUp({
      email: 'john@gmail.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(result).toEqual(
      expect.objectContaining({
        bookings: [],
        email: 'john@gmail.com',
        firstName: 'John',
        id: 10,
        joinedOn: result.joinedOn,
        lastName: 'Doe',
        password: 'password',
      }),
    );
  });

  it('should throw RequestTimeoutException if findOne has an error', async () => {
    userRepository.findOne.mockRejectedValue(new RequestTimeoutException());

    expect(
      provider.signUp({
        email: 'john@gmail.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });

  it('should throw BadRequestException if theres an already existing user', async () => {
    userRepository.findOne.mockResolvedValue({
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'password',
    });

    expect(
      provider.signUp({
        email: 'john@gmail.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw RequestTimeoutException if failed to save user', async () => {
    userRepository.findOne.mockResolvedValue(null);
    hashingProvider.hashPassword.mockResolvedValue('hashed_password');
    userRepository.save.mockRejectedValue(new Error());

    expect(
      provider.signUp({
        email: 'john@gmail.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });
});

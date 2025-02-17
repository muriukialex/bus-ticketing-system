import { RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/providers/user.service';
import jwtConfig from '../config/jwt.config';
import { HashingProvider } from './hashing.provider';
import { SignInProvider } from './sign-in.provider';

describe('SignInProvider', () => {
  let provider: SignInProvider;
  let userService: jest.Mocked<UserService>;
  let hashingProvider: jest.Mocked<HashingProvider>;
  let jwtService: jest.Mocked<JwtService>;
  let jwtConfiguration: ConfigType<typeof jwtConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInProvider,
        {
          provide: HashingProvider,
          useValue: {
            comparePasswords: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
      imports: [ConfigModule.forFeature(jwtConfig)],
    }).compile();

    provider = module.get<SignInProvider>(SignInProvider);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
    hashingProvider = module.get(HashingProvider);
    jwtConfiguration = module.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should have jwtConfiguration injected', () => {
    expect(jwtConfiguration).toBeDefined();
  });

  it('should sign in user using the correct credentials successfully', async () => {
    const accessToken = 'access_token';
    userService.findUserByEmail.mockResolvedValue({
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'password',
    });

    hashingProvider.comparePasswords.mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue('access_token');

    const result = await provider.signIn({
      email: 'john@gmail.com',
      password: 'password',
    });
    expect(result).toEqual(
      expect.objectContaining({ accessToken: accessToken }),
    );
  });

  it('should throw RequestTimeoutException if comparePasswords has an error', async () => {
    userService.findUserByEmail.mockRejectedValue(
      new RequestTimeoutException(),
    );

    expect(
      provider.signIn({
        email: 'john@gmail.com',
        password: 'password',
      }),
    ).rejects.toThrow(RequestTimeoutException);
  });

  it('should throw UnauthorizedException on signing in using the wrong password', async () => {
    userService.findUserByEmail.mockResolvedValue({
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'password',
    });

    hashingProvider.comparePasswords.mockResolvedValue(false);

    expect(
      provider.signIn({
        email: 'john@gmail.com',
        password: 'wrong_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { SignInProvider } from './sign-in.provider';
import { SignUpProvider } from './sign-up.provider';

describe('AuthService', () => {
  let service: AuthService;

  const MockSignInProvider = {
    signIn: () => {
      return Promise.resolve({
        accessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      });
    },
  };

  const MockSignUpProvider = {
    signUp: () => {
      return Promise.resolve<User>({
        bookings: [],
        email: 'john@gmail.com',
        firstName: 'John',
        id: 10,
        joinedOn: new Date(),
        lastName: 'Doe',
        password: 'password',
      });
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SignInProvider,
          useValue: MockSignInProvider,
        },
        {
          provide: SignUpProvider,
          useValue: MockSignUpProvider,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should test signIn method on SignInProvider', async () => {
      const signInDto = {
        email: 'john@gmail.com',
        password: 'password',
      };
      const result = await service.signIn(signInDto);
      expect(result).toEqual({
        accessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      });
    });
  });

  describe('signUp', () => {
    it('should test signUp method on SignUpProvider', async () => {
      const signUpDto = {
        email: 'john@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
      };
      const result = await service.signUp(signUpDto);
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
  });
});

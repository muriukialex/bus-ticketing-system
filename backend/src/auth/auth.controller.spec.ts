import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test signIn method', async () => {
    authService.signIn.mockResolvedValue({
      accessToken: 'access_token',
    });
    const signInDto = { email: 'john@gmail.com', password: 'password' };
    const result = await controller.signIn(signInDto);
    expect(result).toEqual({
      accessToken: 'access_token',
    });
  });

  it('should test signUp method', async () => {
    const mockUser: User = {
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'hashed_password',
    } as User;

    authService.signUp.mockResolvedValue(mockUser);
    const signUpDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: 'password',
    };
    const result = await controller.signUp(signUpDto);
    expect(result).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: result.password,
      }),
    );
  });
});

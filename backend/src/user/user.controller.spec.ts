import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should test getUserById method using a user id', async () => {
    const mockUser: User = {
      bookings: [],
      email: 'john@gmail.com',
      firstName: 'John',
      id: 10,
      joinedOn: new Date(),
      lastName: 'Doe',
      password: 'hashed_password',
    } as User;

    userService.findUserById.mockResolvedValue(mockUser);

    const result = await controller.getUserById(10);
    expect(result).toEqual(expect.objectContaining(mockUser));
  });
});

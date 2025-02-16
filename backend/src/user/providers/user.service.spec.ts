import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user.entity';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';
import { UserService } from './user.service';

describe('UserService', () => {
  let provider: UserService;

  const MockFindUserByEmailProvider = {
    findUserByEmail: () => {
      return Promise.resolve<User>({
        bookings: [],
        email: 'john@gmail.com',
        firstName: 'John',
        id: 10,
        joinedOn: new Date(),
        lastName: 'Doe',
        password: 'hashed_password',
      });
    },
  };

  const MockFindUserByIdProvider = {
    findUserById: () => {
      return Promise.resolve({
        bookings: [],
        email: 'john@gmail.com',
        firstName: 'John',
        id: 10,
        joinedOn: new Date(),
        lastName: 'Doe',
        password: 'hashed_password',
      });
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: FindUserByEmailProvider,
          useValue: MockFindUserByEmailProvider,
        },
        {
          provide: FindUserByIdProvider,
          useValue: MockFindUserByIdProvider,
        },
      ],
    }).compile();

    provider = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('findUserByEmail', () => {
    it('should test findUserByEmail method on FindUserByEmailProvider', async () => {
      const user = await provider.findUserByEmail('john@gmail.com');

      expect(user).toEqual(
        expect.objectContaining({
          bookings: [],
          email: 'john@gmail.com',
          firstName: 'John',
          id: 10,
          joinedOn: user.joinedOn,
          lastName: 'Doe',
          password: 'hashed_password',
        }),
      );
    });
  });

  describe('findUserById', () => {
    it('should test findUserById method on FindUserByIdProvider', async () => {
      const user = await provider.findUserById(10);

      expect(user).toEqual(
        expect.objectContaining({
          bookings: [],
          email: 'john@gmail.com',
          firstName: 'John',
          id: 10,
          joinedOn: user.joinedOn,
          lastName: 'Doe',
          password: 'hashed_password',
        }),
      );
    });
  });
});

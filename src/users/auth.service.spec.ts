import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    //create the fake copy of users service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can ceate an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('it create a new user with salted and hashed password', async () => {
    const user = await service.signup('asd@asdf.com', 'asdasd123');

    expect(user.password).not.toEqual('asdasd123');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throw an error if user signs up with email that is in used', async () => {
    await service.signup('asdf@asdf.com', 'asdasd');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throw error if signin in unused email', async () => {
    await expect(service.signin('asd@asd.com', 'asd123')).rejects.toThrow(
      'user not found',
    );
  });

  it('throws if an invalid password is privided', async () => {
    await service.signup('asdfa@asdg.com', 'asdf12');
    await expect(service.signin('asdfa@asdg.com', 'asdf')).rejects.toThrow(
      'bad password',
    );
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');

    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  });
});

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TUser } from './users.type';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users: TUser[] = [];

  findAll(): TUser[] {
    return this.users;
  }

  findUser(id: string): TUser | {} {
    return this.users.find((user) => user.id === id) ?? {};
  }

  createUser(createUserDto: CreateUserDto) {
    this.users.push({
      id: uuidv4(),
      ...createUserDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './users.dto';
import { User } from './users.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.getAll();
  }

  findUser(id: number): Promise<User> {
    if (this.users.find((user) => user.id === id)) {
      return Promise.resolve(this.users.find((user) => user.id === id));
    }
    throw new Error();
  }

  createUser(createUserDto: CreateUserDto) {
    this.users.push({
      id: uuidv4(),
      ...createUserDto,
    });
  }
}

import { Injectable } from '@nestjs/common';
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

  async findUser(id: number) {
    const response = await this.usersRepository.getWithId(id);
    if (!response) throw new Error();
    return { data: response };
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const result = await this.usersRepository.create(createUserDto);
      return { data: createUserDto };
    } catch {
      throw new Error();
    }
  }
}

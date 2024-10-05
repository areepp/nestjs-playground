import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findUserById(id: number) {
    const response = await this.usersRepository.getOneWithId(id);
    if (!response) throw new NotFoundException();
    return response;
  }

  async findUserByEmail(email: string) {
    const response = await this.usersRepository.getOneWithEmail(email);
    if (!response) throw new NotFoundException();
    return response;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.create(createUserDto);
      return createUserDto;
    } catch {
      throw new Error();
    }
  }
}

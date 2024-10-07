import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { User } from './users.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
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
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.usersRepository.create({
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
      });
      const { password, ...rest } = createUserDto;
      return { ...rest };
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Email already exists');
      }
      throw new Error();
    }
  }
}

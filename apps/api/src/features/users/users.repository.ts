import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    return this.database
      .selectFrom('users')
      .select(['id', 'email', 'name'])
      .execute();
  }

  async getOneWithId(id: number) {
    return this.database
      .selectFrom('users')
      .select(['id', 'email', 'name'])
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async getOneWithEmail(email: string) {
    return this.database
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }

  async create(dto: CreateUserDto) {
    return this.database.insertInto('users').values(dto).execute();
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.database
      .updateTable('users')
      .set({ name: dto.name })
      .where('id', '=', id)
      .execute();
  }
}

import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    return this.database.selectFrom('users').selectAll().execute();
  }

  async getWithId(id: number) {
    return this.database
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async create(dto: CreateUserDto) {
    return this.database.insertInto('users').values(dto).execute();
  }
}

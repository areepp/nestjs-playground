import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
@Injectable()
export class UsersRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    return this.database.selectFrom('users').selectAll().execute();
  }
}

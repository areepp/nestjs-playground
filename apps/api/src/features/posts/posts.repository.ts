import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { Database } from 'src/database/database';

@Injectable()
export class PostsRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    return this.database.selectFrom('posts').selectAll().execute();
  }

  async createOne(payload: CreatePostDto & { user_id: number }) {
    return this.database.insertInto('posts').values(payload).execute();
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { Database } from 'src/database/database';
import { InfinitePaginationParams } from 'src/utils/dto';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

@Injectable()
export class PostsRepository {
  constructor(private readonly database: Database) {}

  async getAll({
    userId,
    params: { cursor, limit = 10 },
  }: {
    userId?: number;
    params?: InfinitePaginationParams;
  }) {
    return this.database.transaction().execute(async (transaction) => {
      let postsQuery = transaction
        .selectFrom('posts')
        .selectAll('posts')
        .select((eb) => [
          jsonObjectFrom(
            eb
              .selectFrom('users')
              .select(['name', 'id', 'profile_picture'])
              .whereRef('users.id', '=', 'posts.user_id'),
          ).as('user'),
        ])
        .orderBy('id', 'desc')
        .limit(limit + 1); // fetch one extra to check for next page

      if (userId) {
        postsQuery = postsQuery.where('user_id', '=', userId);
      }

      if (cursor) {
        postsQuery = postsQuery.where('id', '<', cursor); // use id as cursor
      }

      const posts = await postsQuery.execute();

      const hasNextPage = posts.length > limit;
      const data = hasNextPage ? posts.slice(0, -1) : posts;
      const nextCursor = hasNextPage ? data[data.length - 1].id : null;

      return {
        data,
        meta: {
          nextCursor,
          hasNextPage,
        },
      };
    });
  }

  async createOne(payload: CreatePostDto & { user_id: number }) {
    return this.database.insertInto('posts').values(payload).execute();
  }

  async delete(postId: number, userId: number) {
    const result = await this.database
      .deleteFrom('posts')
      .where('id', '=', postId)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    return result.numDeletedRows > 0n;
  }
}

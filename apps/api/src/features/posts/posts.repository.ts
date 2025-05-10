import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { Database } from 'src/database/database';
import { PaginationParams } from 'src/utils/dto';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

@Injectable()
export class PostsRepository {
  constructor(private readonly database: Database) {}

  async getAll({
    userId,
    params: { page = 1, per_page = 10 },
  }: {
    userId?: number;
    params?: PaginationParams;
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
        .orderBy('created_at', 'desc')
        .offset((page - 1) * per_page)
        .limit(per_page);

      if (userId) postsQuery = postsQuery.where('user_id', '=', userId);
      const posts = await postsQuery.execute();

      let countQuery = transaction
        .selectFrom('posts')
        .select((expressionBuilder) =>
          expressionBuilder.fn.countAll().as('count'),
        );

      if (userId) countQuery = countQuery.where('user_id', '=', userId);

      const { count } = await countQuery.executeTakeFirstOrThrow();

      return {
        data: posts,
        meta: {
          current_page: page,
          per_page: per_page,
          total_count: Number(count),
          total_pages: Math.ceil((count as number) / per_page),
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

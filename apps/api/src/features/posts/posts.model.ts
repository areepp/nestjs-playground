import { ColumnType, Generated, Selectable } from 'kysely';

export interface PostsTable {
  id: Generated<number>;
  user_id: number;
  content: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface LikesTable {
  id: Generated<number>;
  post_id: number;
  user_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Post = Selectable<PostsTable>;
export type Like = Selectable<LikesTable>;

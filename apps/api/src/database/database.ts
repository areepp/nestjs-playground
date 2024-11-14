import { Kysely } from 'kysely';
import { LikesTable, PostsTable } from 'src/features/posts/posts.model';
import { UsersTable } from 'src/features/users/users.model';

interface Tables {
  users: UsersTable;
  posts: PostsTable;
  likes: LikesTable;
}

export class Database extends Kysely<Tables> {}

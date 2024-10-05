import { Kysely } from 'kysely';
import { UsersTable } from 'src/features/users/users.model';

interface Tables {
  users: UsersTable;
}

export class Database extends Kysely<Tables> {}

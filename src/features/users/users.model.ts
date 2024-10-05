import { Generated, Insertable, Selectable } from 'kysely';

export interface UsersTable {
  id: Generated<number>;
  name: string;
  email: string;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;

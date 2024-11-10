import { Generated, Insertable, Selectable } from 'kysely';

export interface UsersTable {
  id: Generated<number>;
  name: string;
  profile_picture: string;
  email: string;
  password: string;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;

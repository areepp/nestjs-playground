import { Kysely } from 'kysely';

export async function up(database: Kysely<unknown>): Promise<void> {
  database.schema
    .alterTable('users')
    .addColumn('profile_picture', 'text')
    .execute();
}

export async function down(database: Kysely<unknown>): Promise<void> {
  await database.schema
    .alterTable('users')
    .dropColumn('profile_picture')
    .execute();
}

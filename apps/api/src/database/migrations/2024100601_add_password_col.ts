import { Kysely } from 'kysely';

export async function up(database: Kysely<unknown>): Promise<void> {
  await database.schema
    .alterTable('users')
    .addColumn('password', 'text', (column) => column.notNull())
    .execute();
}

export async function down(database: Kysely<unknown>): Promise<void> {
  await database.schema.alterTable('users').dropColumn('password').execute();
}

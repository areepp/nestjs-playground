import { Kysely } from 'kysely';

export async function up(database: Kysely<unknown>): Promise<void> {
  database.schema
    .createTable('users')
    .addColumn('id', 'serial', (column) => column.primaryKey())
    .addColumn('name', 'text', (column) => column.notNull())
    .addColumn('email', 'text', (column) => column.notNull().unique());
}

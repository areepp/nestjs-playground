import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Alter the `user_id` in `Posts` table
  await db.schema
    .alterTable('Posts')
    .dropColumn('user_id') // Drop existing string column
    .execute();
  await db.schema
    .alterTable('Posts')
    .addColumn('user_id', 'integer', (col) => col.notNull()) // Re-add as integer
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Roll back by changing `user_id` back to string type

  // In `Posts` table
  await db.schema.alterTable('Posts').dropColumn('user_id').execute();
  await db.schema
    .alterTable('Posts')
    .addColumn('user_id', 'varchar(255)', (col) => col.notNull())
    .execute();
}

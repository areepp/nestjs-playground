import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Drop the old `Posts` and `Likes` tables
  await db.schema.dropTable('Likes').execute();
  await db.schema.dropTable('Posts').execute();

  // Create the new `posts` table
  await db.schema
    .createTable('posts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.notNull())
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  // Create the new `likes` table with lowercase name
  await db.schema
    .createTable('likes')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('post_id', 'integer', (col) =>
      col.references('posts.id').onDelete('cascade').notNull(),
    )
    .addColumn('user_id', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop the new `posts` and `likes` tables
  await db.schema.dropTable('likes').execute();
  await db.schema.dropTable('posts').execute();

  // Re-create the old `Posts` and `Likes` tables
  await db.schema
    .createTable('Posts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('content', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  await db.schema
    .createTable('Likes')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('post_id', 'integer', (col) =>
      col.references('Posts.id').onDelete('cascade').notNull(),
    )
    .addColumn('user_id', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();
}

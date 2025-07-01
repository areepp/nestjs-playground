import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Database } from 'src/database/database';

@Injectable()
export class PostsSeed {
  constructor(private readonly database: Database) {}

  @Command({
    command: 'seed:posts',
    describe: 'Seed 50 posts for users with ids 1, 2, 3',
  })
  async create() {
    const userIds = ['1', '2', '3'];

    const posts = Array.from({ length: 50 }).map(() => ({
      user_id: userIds[Math.floor(Math.random() * userIds.length)],
      content: faker.lorem.paragraph(),
    }));

    await this.database.insertInto('posts').values(posts).execute();

    console.log('✅ Seeded 50 posts for users 1, 2, and 3');
  }
}

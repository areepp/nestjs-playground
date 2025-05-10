import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PostsSeed } from 'src/features/posts/post.seed';

import { PostsModule } from 'src/features/posts/posts.module';

@Module({
  imports: [CommandModule, PostsModule],
  providers: [PostsSeed],
  exports: [PostsSeed],
})
export class SeedsModule {}

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { PostsSeed } from './post.seed';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostsSeed],
  exports: [PostsService, PostsSeed],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { FileStorageModule } from 'src/shared/file-upload/file-storage.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [FileStorageModule, PostsModule],
})
export class UsersModule {}

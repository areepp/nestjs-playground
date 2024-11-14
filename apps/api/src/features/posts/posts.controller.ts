import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from '../auth/auth.user.decorator';
import { CreatePostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    const data = await this.postsService.getAll();
    return {
      data,
    };
  }

  @Post()
  async createPost(@User() user, @Body() dto: CreatePostDto) {
    return await this.postsService.createPost(user.id, dto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from '../auth/auth.user.decorator';
import { CreatePostDto } from './posts.dto';
import { PaginationParams } from 'src/utils/dto';
import { MessageResponse, PaginatedResponse } from 'src/utils/common-types';
import { Post as TPost } from './posts.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll(
    @Query() params: PaginationParams,
  ): Promise<PaginatedResponse<TPost>> {
    return this.postsService.getAll({ params });
  }

  @Post()
  async createPost(@User() user, @Body() dto: CreatePostDto) {
    return await this.postsService.createPost(user.id, dto);
  }

  @Delete(':id')
  async deletePost(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageResponse> {
    return await this.postsService.deletePost(id, user.id);
  }
}
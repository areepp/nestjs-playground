import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './posts.dto';
import { PaginationParams } from 'src/utils/dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAll({
    userId,
    params,
  }: {
    userId?: number;
    params?: PaginationParams;
  }) {
    return this.postsRepository.getAll({ userId, params });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    await this.postsRepository.createOne({ user_id: userId, ...dto });
    return dto;
  }

  async deletePost(postId: number, userId: number) {
    const recordDeleted = await this.postsRepository.delete(postId, userId);
    return {
      message: recordDeleted
        ? 'Post deleted successfully'
        : 'No post deleted. Either the post does not exist or the user is not authorized.',
    };
  }
}

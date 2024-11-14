import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAll() {
    return this.postsRepository.getAll();
  }

  async createPost(userId: number, dto: CreatePostDto) {
    await this.postsRepository.createOne({ user_id: userId, ...dto });
    return dto;
  }
}

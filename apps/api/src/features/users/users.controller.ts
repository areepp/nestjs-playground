import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/auth.user.decorator';
import { UpdateUserDto } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResponse } from 'src/utils/common-types';
import { Post } from '../posts/posts.model';
import { PostsService } from '../posts/posts.service';
import { PaginationParams } from 'src/utils/dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      data,
    };
  }

  @Get('me')
  async findMyUserDetail(@User() user) {
    return await this.usersService.findUserById(user.id);
  }

  @Get('me/posts')
  async getMyPost(
    @User() user,
    @Query() params: PaginationParams,
  ): Promise<PaginatedResponse<Post>> {
    return await this.postsService.getAll({ userId: user.id, params });
  }

  @Patch('me')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async editUser(
    @User() user,
    @Body() dto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
        fileIsRequired: false,
      }),
    )
    profilePictureFile: Express.Multer.File,
  ) {
    return await this.usersService.update(user.id, {
      name: dto.name,
      profilePictureFile,
    });
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }
}

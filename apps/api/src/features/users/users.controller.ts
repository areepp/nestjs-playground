import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/auth.user.decorator';
import { UpdateUserDto } from './users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

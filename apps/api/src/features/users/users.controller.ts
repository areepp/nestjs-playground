import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/auth.user.decorator';
import { UpdateUserDto } from './users.dto';

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
  async editUser(@User() user, @Body() dto: UpdateUserDto) {
    return await this.usersService.update(user.id, dto);
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }
}

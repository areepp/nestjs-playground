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

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserById(id);
  }

  @Patch(':id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
    @Body() dto: UpdateUserDto,
  ) {
    if (id !== user.id) throw new ForbiddenException();

    return await this.usersService.update(id, dto);
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto, GetUsersQuery } from './users.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll(@Query() query: GetUsersQuery) {
    return { data: `all users, subscribed: ${query.is_subscribed}` };
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return { data: `User id: ${id}` };
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto, GetUsersQuery } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: GetUsersQuery) {
    return {
      data: this.usersService.findAll(),
      is_subscribed: query.is_subscribed,
    };
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return { data: this.usersService.findUser(id) };
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.createUser(createUserDto);
    return createUserDto;
  }
}

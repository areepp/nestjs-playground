import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, GetUsersQuery } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: GetUsersQuery) {
    return {
      data: await this.usersService.findAll(),
      is_subscribed: query.is_subscribed,
    };
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: string) {
    try {
      const response = await this.usersService.findUser(Number(id));
      return response;
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}

import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

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

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: string) {
    try {
      const data = await this.usersService.findUserById(Number(id));
      return {
        data,
      };
    } catch {
      throw new NotFoundException();
    }
  }
}

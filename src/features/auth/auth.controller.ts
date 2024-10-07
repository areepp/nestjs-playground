import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './passport-local.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';
import { Public } from './auth-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const response = await this.authService.register(dto);
    return {
      data: response,
    };
  }
}

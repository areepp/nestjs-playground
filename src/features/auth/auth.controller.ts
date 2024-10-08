import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './passport-local.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';
import { Public } from './auth-public.decorator';
import { JwtRefreshAuthGuard } from './passport-jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user);

    res.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      access_token: tokens.access_token,
    };
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const response = await this.authService.register(dto);
    return {
      data: response,
    };
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}

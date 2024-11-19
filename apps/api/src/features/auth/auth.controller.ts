import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { LocalAuthGuard } from './passport-local.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/users.dto';
import { Public } from './auth-public.decorator';
import { JwtRefreshAuthGuard } from './passport-jwt-refresh.guard';
import { User } from '../auth/auth.user.decorator';
import { MessageResponse } from 'src/utils/common-types';

const REFRESH_TOKEN_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(user);

    res.cookie('refreshToken', tokens.refresh_token, REFRESH_TOKEN_OPTIONS);

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
  async refreshToken(@User() user) {
    return this.authService.refreshToken(user);
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageResponse> {
    res.clearCookie('refreshToken', REFRESH_TOKEN_OPTIONS);
    return {
      message: 'logout successful',
    };
  }
}

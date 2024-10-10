import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './passport-local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport-jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './passport-jwt-refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
})
export class AuthModule {}

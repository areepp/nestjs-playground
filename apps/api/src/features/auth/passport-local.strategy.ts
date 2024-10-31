import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly moduleRef: ModuleRef,
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<any> {
    try {
      const contextId = ContextIdFactory.getByRequest(request);
      const authService = await this.moduleRef.resolve(AuthService, contextId);
      const user = await authService.validateUser(email, password);
      return user;
    } catch {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}

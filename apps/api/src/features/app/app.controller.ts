import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../auth/auth-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env.validation';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ validate })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

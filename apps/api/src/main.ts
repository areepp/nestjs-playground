import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app/app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();

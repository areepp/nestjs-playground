import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app/app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();

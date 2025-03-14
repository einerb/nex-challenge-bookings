import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configureContainer } from './infrastructure/containers/configure-container';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  configureContainer();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

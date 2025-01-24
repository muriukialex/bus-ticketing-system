import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Setting whitelist to true ensures that nestjs strips off
       * unexpected data items as request payload
       */
      whitelist: true,

      /**
       * Setting whitelist to true ensures that nestjs throws an error
       * for unexpected data items as request payload
       */
      forbidNonWhitelisted: true,

      transformOptions: {
        // automatically transform dtos to their specific types
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

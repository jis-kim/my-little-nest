import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true, // remove properties that are not in the DTO
      forbidNonWhitelisted: true, // throw error if there is a property that is not in the DTO
      transform: true, // string -> number
    }),
  );
  await app.listen(3000);
}
bootstrap();

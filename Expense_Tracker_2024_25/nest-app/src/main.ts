import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for your frontend requests
  app.enableCors();

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true,
  }));

  const port = process.env.PORT ?? 3000; 
  await app.listen(port)
}

bootstrap();

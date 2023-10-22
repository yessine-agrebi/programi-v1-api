import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as express from 'express';
// import { join } from 'path';

let CookieSession: any;

async function bootstrap() {
  CookieSession = await import('cookie-session');
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({ keys: [process.env.SESSION_SECRET] }));
  app.enableCors({ origin: 'http://localhost:3000' });
  app.useGlobalPipes(new ValidationPipe());
  // Serve static files
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix('api/v1');
  await app.listen(5000);
}
bootstrap();

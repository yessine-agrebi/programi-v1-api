import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let CookieSession: any;

console.log(process.env.SESSION_SECRET);

async function bootstrap() {
  CookieSession = await import('cookie-session');
  const app = await NestFactory.create(AppModule);
  app.use(CookieSession({ keys: [process.env.SESSION_SECRET] }));
  app.enableCors({ origin: 'http://localhost:3000' });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();

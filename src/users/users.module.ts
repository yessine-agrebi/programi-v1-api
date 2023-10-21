import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { PasswordReset } from './entities/password-reset.entity';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, GoogleStrategy],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, PasswordReset]),
    FileUploadModule,
  ],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

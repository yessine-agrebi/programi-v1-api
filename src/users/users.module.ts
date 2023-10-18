import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // local interceptor (users)
    // CurrentUserInterceptor,
    // Global interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  imports: [TypeOrmModule.forFeature([User, PasswordReset])],
  exports: [UsersService],
})
export class UsersModule {}

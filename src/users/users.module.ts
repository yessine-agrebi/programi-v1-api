import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [PrismaModule]
})
export class UsersModule {}

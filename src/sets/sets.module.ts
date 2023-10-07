import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SetsController],
  providers: [SetsService, PrismaService],
  imports: [PrismaModule]
})
export class SetsModule {}

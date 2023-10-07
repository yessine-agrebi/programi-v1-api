import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProgramsController],
  providers: [ProgramsService, PrismaService],
  imports: [PrismaModule]
})
export class ProgramsModule {}

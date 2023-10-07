import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, PrismaService],
  imports: [PrismaModule]
})
export class ExercisesModule {}

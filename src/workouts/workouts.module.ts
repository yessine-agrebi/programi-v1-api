import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService, PrismaService],
  imports: [PrismaModule],
})
export class WorkoutsModule {}

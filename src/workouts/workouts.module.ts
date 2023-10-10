import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workout } from './entities/workout.entity';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { ProgramsModule } from 'src/programs/programs.module';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [
    TypeOrmModule.forFeature([Workout]),
    ExercisesModule,
    ProgramsModule,
  ],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}

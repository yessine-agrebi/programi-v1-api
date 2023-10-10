import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [TypeOrmModule.forFeature([Exercise]), UsersModule],
  exports: [ExercisesService],
})
export class ExercisesModule {}

import { Module } from '@nestjs/common';
import { SetsService } from './sets.service';
import { SetsController } from './sets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [TypeOrmModule.forFeature([Set]), ExercisesModule],
})
export class SetsModule {}

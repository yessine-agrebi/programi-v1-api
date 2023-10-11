import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('api/v1/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  createExercise(@Body() body: CreateExerciseDto) {
    return this.exercisesService.create(body);
  }

  @Get()
  findAllExercises() {
    return this.exercisesService.findAll();
  }

  @Get('/:id')
  async findOneExercise(@Param('id') id: string) {
    const exercise = await this.exercisesService.findOne(+id);
    if (!exercise) {
      throw new NotFoundException(`Error finding exercise with id ${id}`);
    }
    return exercise;
  }

  @Patch(':id')
  updateExercise(@Param('id') id: string, @Body() body: UpdateExerciseDto) {
    return this.exercisesService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeExercise(@Param('id') id: string) {
    await this.exercisesService.remove(+id);
  }
  @Get('/workout/:id')
  async getExercisesForWorkout(@Param('id') id: string) {
    return this.exercisesService.getExercisesForWorkout(+id);
  }
  @Patch('/:workout_id/:ids')
  async updateWorkoutIdForManyExercises(
    @Param('workout_id') workout_id: string,
    @Param('ids') ids: string,
  ) {
    const parsedIds: number[] = JSON.parse(ids).map(Number);
    return this.exercisesService.updateWorkoutIdForManyExercises(
      +workout_id,
      parsedIds,
    );
  }
}

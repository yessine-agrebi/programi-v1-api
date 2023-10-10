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
  createProgram(@Body() body: CreateExerciseDto) {
    return this.exercisesService.create(body);
  }

  @Get()
  findAllPrograms() {
    return this.exercisesService.findAll();
  }

  @Get('/:id')
  async findOneProgram(@Param('id') id: string) {
    const exercise = await this.exercisesService.findOne(+id);
    if (!exercise) {
      throw new NotFoundException(`Error finding exercise with id ${id}`);
    }
    return exercise;
  }

  @Patch(':id')
  updateProgram(@Param('id') id: string, @Body() body: UpdateExerciseDto) {
    return this.exercisesService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProgram(@Param('id') id: string) {
    await this.exercisesService.remove(+id);
  }
}

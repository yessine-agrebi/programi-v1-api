import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('api/v1/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exercisesService.create(createExerciseDto);
    if (!exercise) {
      throw new BadRequestException(`Error creating exercise`);
    }
    return exercise;
  }

  @Get()
  findAll() {
    const exercises = this.exercisesService.findAll();
    if (!exercises) {
      throw new NotFoundException(`Error finding exercises`);
    }
    return exercises;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const exercise = this.exercisesService.findOne(+id);
    if (!exercise) {
      throw new NotFoundException(`Error finding exercise with id ${id}`);
    }
    return exercise;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    const exercise = this.exercisesService.update(+id, updateExerciseDto);
    if (!exercise) {
      throw new NotFoundException(`Error updating exercise with id ${id}`);
    }
    return exercise;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const exercise = this.exercisesService.remove(+id);
    if (!exercise) {
      throw new NotFoundException(`Error deleting exercise with id ${id}`);
    }
    return exercise;
  }
}

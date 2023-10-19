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
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { validatePagination } from 'src/utils/pagination.utils';
import validator from 'validator';

@Controller('api/v1/exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createExercise(@Body() body: CreateExerciseDto, @CurrentUser() user) {
    return this.exercisesService.create(body, user);
  }

  @Get()
  findAllExercises(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('exerciseName') exerciseName: string,
    @Query('search') search: string,
    @Query('sort', new DefaultValuePipe([]), ParseArrayPipe) sort: string[],
  ) {
    const maxLimit = 50;
    validatePagination(limit, page, maxLimit);
    if (search) {
      search = validator.escape(search.trim());
    }
    return this.exercisesService.findAll(
      {
        exerciseName,
      },
      search,
      page,
      limit,
      sort,
    );
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

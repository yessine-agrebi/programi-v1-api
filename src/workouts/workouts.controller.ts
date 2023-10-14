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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('api/v1/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  createWorkout(@Body() body: CreateWorkoutDto) {
    return this.workoutsService.create(body);
  }

  @Get()
  findAllWorkouts() {
    return this.workoutsService.findAll();
  }

  @Get('/:id')
  async findOneWorkout(@Param('id') id: string) {
    const workout = await this.workoutsService.findOne(+id);
    if (!workout) {
      throw new NotFoundException(`Error finding workout with id ${id}`);
    }
    return workout;
  }

  @Patch(':id')
  updateProgram(@Param('id') id: string, @Body() body: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProgram(@Param('id') id: string) {
    await this.workoutsService.remove(+id);
  }
  @Get('program/:id')
  async getWorkoutsOfProgram(@Param('id') id: string) {
    return await this.workoutsService.getWorkoutsOfProgram(+id);
  }
}

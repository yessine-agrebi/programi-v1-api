import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Controller('api/v1/workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    const workout = await this.workoutsService.create(createWorkoutDto);
    if (!workout) {
      throw new BadRequestException('Error creating workout');
    }
    return workout;
  }

  @Get()
  async findAll() {
    const workouts = await this.workoutsService.findAll();
    if (!workouts) {
      throw new NotFoundException('Error finding workouts');
    }
    return workouts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const workout = await this.workoutsService.findOne(+id);
    if (!workout) {
      throw new NotFoundException(`Error finding workout with id ${id}`);
    }
    return workout;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.workoutsService.update(+id, updateWorkoutDto);
    if (!workout) {
      throw new NotFoundException(`Error updating workout with id ${id}`);
    }
    return workout;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const workout = await this.workoutsService.remove(+id);
    if (!workout) {
      throw new NotFoundException(`Error deleting workout with id ${id}`);
    }
    return workout;
  }
}

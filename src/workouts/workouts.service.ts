import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}
  async create(createWorkoutDto: CreateWorkoutDto) {
    return await this.prisma.workout.create({data: createWorkoutDto})
  }

  async findAll() {
    return this.prisma.workout.findMany()
  }

  async findOne(id: number) {
    return this.prisma.workout.findUnique({where: {workoutId: id}})
  }

  async update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({where: {workoutId: id}, data: updateWorkoutDto})
  }

  async remove(id: number) {
    return this.prisma.workout.delete({where: {workoutId: id}})
  }
}

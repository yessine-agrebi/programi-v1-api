import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}
  create(createWorkoutDto: CreateWorkoutDto) {
    return this.prisma.workout.create({data: createWorkoutDto})
  }

  findAll() {
    return this.prisma.workout.findMany()
  }

  findOne(id: number) {
    return this.prisma.workout.findUnique({where: {workoutId: id}})
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({where: {workoutId: id}, data: updateWorkoutDto})
  }

  remove(id: number) {
    return this.prisma.workout.delete({where: {workoutId: id}})
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createExerciseDto: CreateExerciseDto) {
    try {
      const createdExercise = await this.prisma.exercise.create({
        data: createExerciseDto
      });
      return createdExercise;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error; // Re-throw the error for higher-level handling
    }
  }
  

  async findAll() {
    return await this.prisma.exercise.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.exercise.findUnique({ where: { exerciseId: id } });
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return await this.prisma.exercise.update({ where: { exerciseId: id }, data: updateExerciseDto });
  }

  async remove(id: number) {
    return await this.prisma.exercise.delete({ where: { exerciseId: id } });
  }
}

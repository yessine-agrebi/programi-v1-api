import { Injectable } from '@nestjs/common';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({ data: createExerciseDto });
  }
  

  findAll() {
    return this.prisma.exercise.findMany();
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({ where: { exerciseId: id } });
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({ where: { exerciseId: id }, data: updateExerciseDto });
  }

  remove(id: number) {
    return this.prisma.exercise.delete({ where: { exerciseId: id } });
  }
}

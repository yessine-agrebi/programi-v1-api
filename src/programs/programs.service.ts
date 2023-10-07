import { Body, Get, Injectable, Post } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramDto) {
    try {
      return await this.prisma.program.create({ data: createProgramDto });
    } catch (error) {
      console.log(error);
      throw new Error('Error creating program');
    }
  }
  findAll() {
    return this.prisma.program.findMany();
  }

  findOne(id: number) {
    return this.prisma.program.findUnique({ where: { programId: id } });
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return this.prisma.program.update({
      where: { programId: id },
      data: updateProgramDto,
    });
  }

  remove(id: number) {
    return this.prisma.program.delete({ where: { programId: id } });
  }
  async getWorkoutsOfProgram(id: number) {
    const result = await this.prisma.workout.findMany({
      select: {
        program: {
          select: {
            programName: true,
            description: true,
          },
        },
        exercise: {
          select: {
            exerciseId: true,
            exerciseName: true,
            bodyPart: true,
            equipment: true,
          },
        },
        date: true,
      },
      where: {
        programId: id,
      },
    });

    const groupedResults = result.reduce((result, item) => {
  const programKey = `${item.program.programName}-${item.program.description}`;

  if (!result[programKey]) {
    result[programKey] = {
      program: item.program,
      exercises: [],
    };
  }

  result[programKey].exercises.push({
    exerciseName: item.exercise.exerciseName,
    bodyPart: item.exercise.bodyPart,
    equipment: item.exercise.equipment,
    date: item.date.toLocaleDateString(),
  });

  return result;
}, {});


    const finalResult = Object.values(groupedResults);
    return finalResult;
  }
}

import { Body, Get, Injectable, Post } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  create(createProgramDto: CreateProgramDto) {
    try {
      return this.prisma.program.create({ data: createProgramDto });
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
    const workouts = await this.prisma.program.findUnique({
      where: { programId: id },
      include: {
        workouts: {
          include: {
            exercise: {
              select: {
                exerciseId: true,
                exerciseName: true,
                bodyPart: true,
                equipment: true,
              },
            },
          },
          orderBy: { date: 'asc' },
        },
      },
    });
    const processedWorkouts = workouts.workouts.reduce((result, workout) => {
      const exerciseInfo = {
        exerciseId: workout.exercise.exerciseId,
        exerciseName: workout.exercise.exerciseName,
        bodyPart: workout.exercise.bodyPart,
        equipment: workout.exercise.equipment,
      };
      const dateString = workout.date.toISOString();
      if (result.has(dateString)) {
        result.get(dateString).workouts.push({
          workoutId: workout.workoutId,
          exercises: [exerciseInfo],
        });
      } else {
        result.set(dateString, {
          date: dateString,
          workoutName: workout.workoutName,
          workoutId: workout.workoutId,
          workouts: [{
            workoutId: workout.workoutId,
            exercises: [exerciseInfo],
          }],
        });
      }
    
      return result;
    }, new Map<string, { date: string; workoutName: string; workoutId: number; workouts: { workoutId: number;  exercises: any[]; }[] }>());
    
    const result = {
      programId: workouts.programId,
      programName: workouts.programName,
      description: workouts.description,
      startDate: workouts.startDate,
      endDate: workouts.endDate,
      workouts: [...processedWorkouts.values()],
    };
        
    return result;
    
    
    //     const groupedResults = workouts.reduce((result, item) => {
    //     const programKey = `${item.program.programName}-${item.program.description}`;

    //   if (!result[programKey]) {
    //     result[programKey] = {
    //       program: item.program,
    //       exercises: [],
    //     };
    //   }

    //   result[programKey].exercises.push({
    //     exerciseId: item.exercise.exerciseId,
    //     exerciseName: item.exercise.exerciseName,
    //     bodyPart: item.exercise.bodyPart,
    //     equipment: item.exercise.equipment,
    //     date: item.date.toLocaleDateString(),
    //   });

    //   return result;
    // }, {});

    // const finalResult = Object.values(groupedResults);
    // return finalResult;
  }
}

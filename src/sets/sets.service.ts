import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Set } from './entities/set.entity';

@Injectable()
export class SetsService {
  constructor(private prisma: PrismaService) {}
  create(createSetDto: CreateSetDto) {
    return this.prisma.set.create({data: createSetDto});
  }

  findAll() {
    return this.prisma.set.findMany();
  }

  findOne(id: number) {
    return this.prisma.set.findUnique({where: {setId: id}});
  }

  update(id: number, updateSetDto: UpdateSetDto) {
    return this.prisma.set.update({where: {setId: id}, data: updateSetDto});
  }

  remove(id: number) {
    return this.prisma.set.delete({where: {setId: id}});
  }

  async getSetsByExerciseId(exerciseId: number) {
    const results = await this.prisma.set.findMany({
      where: {
        workout: {
          exerciseId: exerciseId
        }
      },
      orderBy: {
        workout: {
          date: 'asc'
        }
      },
      include: {
        workout: {
          select: {
            date: true,
            exerciseId: true
          },
          
        }

      }
    })
    
    //group sets by workout date
    const groupedSets = {};
    results.forEach((set: Set) => {
        const date = set.workout.date.toISOString().split('T')[0];
        if (!groupedSets[date]) {
            groupedSets[date] = [];
        }
        groupedSets[date].push({
            setId: set.setId,
            reps: set.reps,
            weight: set.weight,
            setNum: set.setNum,
            isBestSet: set.isBestSet,
        });
    });

    // Convert grouped sets to desired format
    const result = Object.keys(groupedSets).map(date => ({
        date: date,
        sets: groupedSets[date],
    }));

    return result;
    
  }
    
}

import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  getSetsByExerciseId(exerciseId: number) {
    const setDetails = this.prisma.set.findMany({
      where: {
        workout: {
          exercise: {
            exerciseId: 1,
          },
        },
      },
      select: {
        reps: true,
        weight: true,
        setNum: true,
      },
      orderBy: {
        setNum: 'asc',
      },
    });
    return setDetails;
    
  }
    
}

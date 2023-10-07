import { Injectable } from '@nestjs/common';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetsService {
  constructor(private prisma: PrismaService) {}
  async create(createSetDto: CreateSetDto) {
    return await this.prisma.set.create({data: createSetDto});
  }

  async findAll() {
    return await this.prisma.set.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.set.findUnique({where: {setId: id}});
  }

  async update(id: number, updateSetDto: UpdateSetDto) {
    return await this.prisma.set.update({where: {setId: id}, data: updateSetDto});
  }

  async remove(id: number) {
    return await this.prisma.set.delete({where: {setId: id}});
  }
}

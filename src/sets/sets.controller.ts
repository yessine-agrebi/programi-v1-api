import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('api/v1/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  async create(@Body() createSetDto: CreateSetDto) {
    const set = await this.setsService.create(createSetDto);
    if (!set) {
      throw new BadRequestException('Error creating set');
    }
    return set;
  }

  @Get()
  async findAll() {
    const sets = await this.setsService.findAll();
    if (!sets) {
      throw new NotFoundException('Error finding sets');
    }
    return sets;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const set = await this.setsService.findOne(+id);
    if (!set) {
      throw new NotFoundException(`Error finding set with id ${id}`);
    }
    return set;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    const set = await this.setsService.update(+id, updateSetDto);
    if (!set) {
      throw new NotFoundException(`Error updating set with id ${id}`);
    }
    return set;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const set = await this.setsService.remove(+id);
    if (!set) {
      throw new NotFoundException(`Error deleting set with id ${id}`);
    }
    return set;
  }
  @Get('exercise/:exerciseId')
  async getSetsByExerciseId(@Param('exerciseId') exerciseId: number) {
    const setDetails = await this.setsService.getSetsByExerciseId(+exerciseId);
    if (!setDetails) {
      throw new NotFoundException(`Error getting sets for exercise with id ${exerciseId}`);
    }
    return setDetails;
  }
}

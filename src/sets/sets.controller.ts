import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('api/v1/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto) {
    const set = this.setsService.create(createSetDto);
    if (!set) {
      throw new BadRequestException('Error creating set');
    }
    return set;
  }

  @Get()
  findAll() {
    const sets = this.setsService.findAll();
    if (!sets) {
      throw new NotFoundException('Error finding sets');
    }
    return sets;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const set = this.setsService.findOne(+id);
    if (!set) {
      throw new NotFoundException(`Error finding set with id ${id}`);
    }
    return set;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
    const set = this.setsService.update(+id, updateSetDto);
    if (!set) {
      throw new NotFoundException(`Error updating set with id ${id}`);
    }
    return set;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const set = this.setsService.remove(+id);
    if (!set) {
      throw new NotFoundException(`Error deleting set with id ${id}`);
    }
    return set;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SetsService } from './sets.service';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';

@Controller('api/v1/sets')
export class SetsController {
  constructor(private readonly setsService: SetsService) {}

  @Post()
  createSet(@Body() body: CreateSetDto) {
    return this.setsService.create(body);
  }

  @Get()
  findAllSets() {
    return this.setsService.findAll();
  }

  @Get('/:id')
  async findOneSet(@Param('id') id: string) {
    const set = await this.setsService.findOne(+id);
    if (!set) {
      throw new NotFoundException(`Error finding set with id ${id}`);
    }
    return set;
  }

  @Patch(':id')
  updateSet(@Param('id') id: string, @Body() body: UpdateSetDto) {
    return this.setsService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProgram(@Param('id') id: string) {
    await this.setsService.remove(+id);
  }

  @Get('exercise/:exerciseId')
  async findSetsByExerciseId(@Param('exerciseId') exerciseId: string) {
    return await this.setsService.findSetsByExerciseId(+exerciseId);
  }
}

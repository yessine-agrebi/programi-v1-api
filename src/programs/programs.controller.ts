import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('api/v1/programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  async create(@Body() createProgramDto: CreateProgramDto) {
    const program = await this.programsService.create(createProgramDto);
    if (!program) {
      throw new BadRequestException('Error creating program');
    }
    return program;
  }

  @Get()
  async findAll() {
    const programs = await this.programsService.findAll();
    if (!programs) {
      throw new NotFoundException('Error finding programs');
    }
    return programs;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const program = await this.programsService.findOne(+id);
    if (!program) {
      throw new NotFoundException(`Error finding program with id ${id}`);
    }
    return program;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    const program = await this.programsService.update(+id, updateProgramDto);
    if (!program) {
      throw new NotFoundException(`Error updating program with id ${id}`);
    }
    return program;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const program = await this.programsService.remove(+id);
    if (!program) {
      throw new NotFoundException(`Error deleting program with id ${id}`);
    }
    return program;
  }
  @Get('/workouts/:id')
  getWorkoutsOfProgram(@Param('id') id: string) {
    const workouts = this.programsService.getWorkoutsOfProgram(+id);
    if (!workouts) {
      throw new NotFoundException(
        `Error finding workouts for program with id ${id}`,
      );
    }
    return workouts;
  }
}

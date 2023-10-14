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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('api/v1/programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  createProgram(@Body() body: CreateProgramDto) {
    return this.programsService.create(body);
  }

  @Get()
  findAllPrograms() {
    return this.programsService.findAll();
  }

  @Get('/:id')
  async findOneProgram(@Param('id') id: string) {
    const program = await this.programsService.findOne(+id);
    if (!program) {
      throw new NotFoundException(`Error finding program with id ${id}`);
    }
    return program;
  }

  @Patch(':id')
  updateProgram(@Param('id') id: string, @Body() body: UpdateProgramDto) {
    return this.programsService.update(+id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProgram(@Param('id') id: string) {
    await this.programsService.remove(+id);
  }
}

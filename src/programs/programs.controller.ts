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
  UseGuards,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProgramDto } from './dto/program.dto';

@Controller('api/v1/programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ProgramDto)
  createProgram(@Body() body: CreateProgramDto, @CurrentUser() user: User) {
    return this.programsService.create(body, user);
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

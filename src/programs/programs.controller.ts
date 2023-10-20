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
@UseGuards(AuthGuard)
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @Serialize(ProgramDto)
  createProgram(@Body() body: CreateProgramDto, @CurrentUser() user: User) {
    return this.programsService.create(body, user);
  }

  @Get()
  findAllPrograms(@CurrentUser() user: User) {
    return this.programsService.findAll(user.userId);
  }

  @Get('/:programId')
  async findOneProgram(
    @Param('programId') programId: string,
    @CurrentUser() user: User,
  ) {
    const program = await this.programsService.findOne(+programId, user);
    if (!program) {
      throw new NotFoundException(`Error finding program with id ${programId}`);
    }
    return program;
  }

  @Patch(':programId')
  updateProgram(
    @Param('programId') programId: string,
    @Body() body: UpdateProgramDto,
    @CurrentUser() user: User,
  ) {
    return this.programsService.update(+programId, body, user);
  }

  @Delete(':programId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProgram(
    @Param('programId') programId: string,
    @CurrentUser() user: User,
  ) {
    await this.programsService.remove(+programId, user);
  }
}

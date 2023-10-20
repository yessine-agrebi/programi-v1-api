import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('/api/v1/admin/programs')
export class AdminProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAllPrograms() {
    return this.programsService.findAll();
  }

  @Get('/users/:userId')
  @UseGuards(AdminGuard)
  findAllProgramsForUser(@Param('userId') userId: number) {
    return this.programsService.findAll(userId);
  }
}

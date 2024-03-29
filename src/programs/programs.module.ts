import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { UsersModule } from 'src/users/users.module';
import { AdminProgramsController } from './admin-programs.controller';

@Module({
  controllers: [ProgramsController, AdminProgramsController],
  providers: [ProgramsService],
  imports: [TypeOrmModule.forFeature([Program]), UsersModule],
  exports: [ProgramsService],
})
export class ProgramsModule {}

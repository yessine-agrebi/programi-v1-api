import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramsModule } from './programs/programs.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsModule } from './sets/sets.module';

@Module({
  imports: [ProgramsModule, PrismaModule, UsersModule, ExercisesModule, WorkoutsModule, SetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

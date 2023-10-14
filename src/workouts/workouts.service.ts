import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ProgramsService } from 'src/programs/programs.service';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout) private workoutsRepository: Repository<Workout>,
    private exercisesService: ExercisesService,
    private programsService: ProgramsService,
  ) {}

  async create(attributes: Partial<Workout>) {
    const program = await this.programsService.findOne(attributes.programId);
    if (!program) {
      throw new NotFoundException(
        `Program with id ${attributes.programId} not found`,
      );
    }
    try {
      const workout = this.workoutsRepository.create(attributes);
      return await this.workoutsRepository.save(workout);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.workoutsRepository.find();
  }

  findOne(id: number) {
    return this.workoutsRepository.findOneBy({ workoutId: id });
  }

  async update(id: number, attributes: Partial<Workout>) {
    const program = await this.programsService.findOne(attributes.programId);
    if (!program) {
      throw new NotFoundException(
        `Program with id ${attributes.programId} not found`,
      );
    }
    try {
      const workout = await this.workoutsRepository.findOneBy({
        workoutId: id,
      });
      if (!workout) {
        throw new NotFoundException(`Workout with id ${id} not found`);
      }
      Object.assign(workout, attributes);
      return this.workoutsRepository.save(workout);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const workout = await this.findOne(id);
    if (!workout) {
      throw new NotFoundException(`Workout with id ${id} not found`);
    }
    return this.workoutsRepository.remove(workout);
  }

  getWorkoutsOfProgram(id: number) {
    return this.workoutsRepository.find({
      select: ['workoutId', 'workoutName', 'date'],
      where: { programId: id } });
  }
}

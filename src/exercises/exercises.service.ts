import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class ExercisesService extends BaseService<Exercise> {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    private usersService: UsersService,
  ) {
    super(exercisesRepository);
  }

  protected getSearchableColumns(): string[] {
    return ['exerciseName'];
  }

  protected getSortableStringColumns(): string[] {
    return ['exerciseName'];
  }

  async create(attributes: Partial<Exercise>, user: User) {
    try {
      const exercise = this.exercisesRepository.create(attributes);
      return await this.exercisesRepository.save({
        ...exercise,
        userId: user.userId,
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return this.exercisesRepository.findOneBy({ exerciseId: id });
  }

  async update(id: number, attributes: Partial<Exercise>) {
    const user = await this.usersService.findOne(attributes.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id ${attributes.userId} not found`,
      );
    }
    try {
      const exercise = await this.exercisesRepository.findOneBy({
        exerciseId: id,
      });
      if (!exercise) {
        throw new NotFoundException(`Exercise with id ${id} not found`);
      }
      Object.assign(exercise, attributes);
      return this.exercisesRepository.save(exercise);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const exercise = await this.findOne(id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }
    return this.exercisesRepository.remove(exercise);
  }
  //update workoutId for many exercises
  async updateWorkoutIdForManyExercises(
    workoutId: number,
    exercise_ids: number[],
  ) {
    const exercises = await this.exercisesRepository.find({
      where: { exerciseId: In(exercise_ids) },
    });
    if (!exercises) {
      throw new NotFoundException(
        `Exercises with ids ${exercise_ids} not found`,
      );
    }
    try {
      exercises.forEach((exercise) => {
        exercise.workoutId = workoutId;
      });
      return this.exercisesRepository.save(exercises);
    } catch (error) {
      throw error;
    }
  }

  //get all exercises for a workout
  async getExercisesForWorkout(workoutId: number) {
    const exercises = await this.exercisesRepository.find({
      where: { workoutId: workoutId },
    });
    if (!exercises) {
      throw new NotFoundException(
        `Exercises for workout with id ${workoutId} not found`,
      );
    }
    return exercises;
  }
}

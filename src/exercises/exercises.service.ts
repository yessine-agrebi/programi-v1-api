import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    private usersService: UsersService,
  ) {}

  async create(attributes: Partial<Exercise>) {
    const user = await this.usersService.findOne(attributes.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id ${attributes.userId} not found`,
      );
    }
    try {
      const exercise = this.exercisesRepository.create(attributes);
      return await this.exercisesRepository.save(exercise);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.exercisesRepository.find();
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
}

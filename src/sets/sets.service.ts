import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Set } from './entities/set.entity';
import { WorkoutsService } from 'src/workouts/workouts.service';
// import { format } from 'sql-formatter';

@Injectable()
export class SetsService {
  constructor(
    @InjectRepository(Set) private setsRepository: Repository<Set>,
    private workoutsService: WorkoutsService,
  ) {}

  async create(attributes: Partial<Set>) {
    const workout = await this.workoutsService.findOne(attributes.workout_id);
    if (!workout) {
      throw new NotFoundException(
        `Workout with id ${attributes.workout_id} not found`,
      );
    }
    try {
      const set = this.setsRepository.create(attributes);
      return await this.setsRepository.save(set);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.setsRepository.find();
  }

  findOne(id: number) {
    return this.setsRepository.findOneBy({ set_id: id });
  }

  async update(id: number, attributes: Partial<Set>) {
    const workout = await this.workoutsService.findOne(attributes.workout_id);
    if (!workout) {
      throw new NotFoundException(
        `Workout with id ${attributes.workout_id} not found`,
      );
    }
    try {
      const set = await this.setsRepository.findOneBy({
        set_id: id,
      });
      if (!set) {
        throw new NotFoundException(`Set with id ${id} not found`);
      }
      Object.assign(set, attributes);
      return this.setsRepository.save(set);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const set = await this.findOne(id);
    if (!set) {
      throw new NotFoundException(`Set with id ${id} not found`);
    }
    return this.setsRepository.remove(set);
  }

}

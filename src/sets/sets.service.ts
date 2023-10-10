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
    const workout = await this.workoutsService.findOne(attributes.workoutId);
    if (!workout) {
      throw new NotFoundException(
        `Workout with id ${attributes.workoutId} not found`,
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
    return this.setsRepository.findOneBy({ setId: id });
  }

  async update(id: number, attributes: Partial<Set>) {
    const workout = await this.workoutsService.findOne(attributes.workoutId);
    if (!workout) {
      throw new NotFoundException(
        `Workout with id ${attributes.workoutId} not found`,
      );
    }
    try {
      const set = await this.setsRepository.findOneBy({
        setId: id,
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

  async getSetsByExerciseId(exerciseId: number) {
    //Query builder
    //Fetch sets from the database
    const query = this.setsRepository
      .createQueryBuilder('set')
      //We can use leftJoin instead of innerJoin (change logic inside the query)
      .innerJoinAndSelect(
        'set.workout',
        'workout',
        'workout.exerciseId = :exerciseId',
        { exerciseId },
      )
      .orderBy('workout.date', 'ASC');
    const results = await query.getMany();
    // console.log(format(query.getSql()));

    //Impossible to use TypeORM's repository API compared to Prisma)
    // const allSets = await this.setsRepository.find({ relations: ['workout'] });
    // const results2 = allSets
    //   .filter((set) => set.workout.exerciseId === exerciseId)
    //   .sort((a, b) => a.workout.date.getTime() - b.workout.date.getTime());
    // console.log(results2);

    // Group sets by workout date
    const groupedSets = {};
    results.forEach((set: Set) => {
      const date = new Date(set.workout.date).toISOString().split('T')[0];
      if (!groupedSets[date]) {
        groupedSets[date] = [];
      }
      groupedSets[date].push({
        setId: set.setId,
        reps: set.weight,
        weight: set.reps,
        setNum: set.setNum,
        isBestSet: set.isBestSet,
      });
    });

    // Convert grouped sets to desired format
    const result = Object.keys(groupedSets).map((date) => ({
      date: date,
      sets: groupedSets[date],
    }));

    return result;
  }
}

import { Repository } from 'typeorm';
import { Set } from 'src/sets/entities/set.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { generateSet } from '../factories/set.factory';

export async function seedSets(
  setRepository: Repository<Set>,
  exerciseRepository: Repository<Exercise>,
): Promise<void> {
  const exercises = await exerciseRepository.find();

  for (let i = 0; i < 10; i++) {
    const exercise = exercises[Math.floor(Math.random() * exercises.length)];
    const set = generateSet(exercise?.exercise_id);

    const _set = setRepository.create(set);
    await setRepository.save(_set);
  }
}

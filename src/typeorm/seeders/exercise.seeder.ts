import { Repository } from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/users/entities/user.entity';
import { generateExercise } from '../factories/exercise.factory';

export async function seedExercises(
  exerciseRepository: Repository<Exercise>,
  userRepository: Repository<User>,
): Promise<void> {
  const users = await userRepository.find();

  for (let i = 0; i < 10; i++) {
    // Select a random user from the users array.
    const user = users[Math.floor(Math.random() * users.length)];
    const exercise = generateExercise(user.userId);

    const _exercise = exerciseRepository.create(exercise);
    await exerciseRepository.save(_exercise);
  }
}

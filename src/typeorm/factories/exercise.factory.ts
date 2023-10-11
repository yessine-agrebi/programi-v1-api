import { Exercise } from 'src/exercises/entities/exercise.entity';
import { lorem } from 'faker';

export function generateExercise(userId: number): Partial<Exercise> {
  const exercise = {
    exercise_name: lorem.words(3),
    body_part: lorem.word(),
    equipment: lorem.word(),
    user_id: userId, // Associate the exercise with the user.
  };
  return exercise;
}

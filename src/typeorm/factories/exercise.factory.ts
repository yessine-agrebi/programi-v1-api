import { Exercise } from 'src/exercises/entities/exercise.entity';
import { lorem } from 'faker';

export function generateExercise(userId: number): Partial<Exercise> {
  const exercise = {
    exerciseName: lorem.words(3),
    bodyPart: lorem.word(),
    equipment: lorem.word(),
    userId: userId, // Associate the exercise with the user.
  };
  return exercise;
}

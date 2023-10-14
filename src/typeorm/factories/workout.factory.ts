import { Workout } from 'src/workouts/entities/workout.entity';
import { lorem } from 'faker';

export function generateWorkout(programId: number): Partial<Workout> {
  const workout = {
    workoutName: lorem.words(3),
    programId: programId,
    date: new Date(),
  };
  return workout;
}

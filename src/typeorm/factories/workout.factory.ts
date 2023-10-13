import { Workout } from 'src/workouts/entities/workout.entity';
import { lorem } from 'faker';

export function generateWorkout(programId: number): Partial<Workout> {
  const workout = {
    workout_name: lorem.words(3),
    program_id: programId,
    date: new Date(),
  };
  return workout;
}

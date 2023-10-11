import { Repository } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Program } from 'src/programs/entities/program.entity';
import { generateWorkout } from '../factories/workout.factory';

export async function seedWorkouts(
  workoutRepository: Repository<Workout>,
  programRepository: Repository<Program>,
): Promise<void> {
  const programs = await programRepository.find();

  for (let i = 0; i < 10; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const workout = generateWorkout(program.program_id);

    const _workout = workoutRepository.create(workout);
    await workoutRepository.save(_workout);
  }
}

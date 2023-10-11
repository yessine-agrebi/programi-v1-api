import { DataSource } from 'typeorm';
import { seedUsers } from './user.seeder';
import { seedExercises } from './exercise.seeder';
import { seedWorkouts } from './workout.seeder';
import { seedPrograms } from './program.seeder';
// import { seedSets } from './set.seeder';
import { User } from 'src/users/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Program } from 'src/programs/entities/program.entity';
// import { Set } from 'src/sets/entities/set.entity';

export async function databaseSeeder(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  const exerciseRepository = dataSource.getRepository(Exercise);
  const programRepository = dataSource.getRepository(Program);
  const workoutRepository = dataSource.getRepository(Workout);
  // const setRepository = dataSource.getRepository(Set);

  await seedUsers(userRepository);
  await seedExercises(exerciseRepository, userRepository);
  await seedPrograms(programRepository, userRepository);
  await seedWorkouts(workoutRepository, programRepository);
  // await seedSets(setRepository, exerciseRepository);
}

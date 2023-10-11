import { DataSource } from 'typeorm';
import { internet, name, lorem } from 'faker';
import { User } from 'src/users/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

export async function seedData(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  const exerciseRepository = dataSource.getRepository(Exercise);

  for (let i = 0; i < 10; i++) {
    const first_name = name.firstName();
    const last_name = name.lastName();
    const user = {
      email: internet.email(first_name, last_name),
      first_name,
      last_name,
      password: internet.password(),
      height: Math.floor(Math.random() * 250),
      weight: Math.floor(Math.random() * 250),
      age: Math.floor(Math.random() * 50),
    };

    const existingUser = await userRepository.findOneBy({ email: user.email });
    let _user: User;
    if (!existingUser) {
      _user = userRepository.create(user);
      await userRepository.save(_user);
    } else {
      _user = existingUser;
    }

    // Create a new exercise and associate it with the user.
    const exercise = {
      exercise_name: lorem.words(3),
      body_part: lorem.word(),
      equipment: lorem.word(),
      user_id: _user.user_id, // Associate the exercise with the user.
    };

    const _exercise = exerciseRepository.create(exercise);
    await exerciseRepository.save(_exercise);
  }
}

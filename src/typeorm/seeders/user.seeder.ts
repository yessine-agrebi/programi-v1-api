import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { generateUser } from '../factories/user.factory';

export async function seedUsers(
  userRepository: Repository<User>,
): Promise<User[]> {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = generateUser();
    const existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
      const _user = userRepository.create(user);
      await userRepository.save(_user);
      users.push(_user);
    }
  }
  return users;
}

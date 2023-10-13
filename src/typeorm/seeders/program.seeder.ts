import { Repository } from 'typeorm';
import { Program } from 'src/programs/entities/program.entity';
import { User } from 'src/users/entities/user.entity';
import { generateProgram } from '../factories/program.factory';

export async function seedPrograms(
  programRepository: Repository<Program>,
  userRepository: Repository<User>,
): Promise<void> {
  const users = await userRepository.find();

  for (let i = 0; i < 10; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const program = generateProgram(user.userId);

    const _program = programRepository.create(program);
    await programRepository.save(_program);
  }
}

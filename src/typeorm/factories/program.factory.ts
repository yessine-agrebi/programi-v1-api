import { Program } from 'src/programs/entities/program.entity';
import { lorem } from 'faker';

export function generateProgram(userId: number): Partial<Program> {
  const program = {
    program_name: lorem.words(3),
    description: lorem.sentence(),
    start_date: new Date(),
    end_date: new Date(),
    user_id: userId,
  };
  return program;
}

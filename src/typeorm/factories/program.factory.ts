import { Program } from 'src/programs/entities/program.entity';
import { lorem } from 'faker';

export function generateProgram(userId: number): Partial<Program> {
  const program = {
    programName: lorem.words(3),
    description: lorem.sentence(),
    startDate: new Date(),
    endDate: new Date(),
    userId: userId,
  };
  return program;
}

import { IsDateString, IsInt } from 'class-validator';

export class CreateWorkoutDto {
  @IsInt()
  program_id: number;

  @IsDateString()
  date: Date;
}

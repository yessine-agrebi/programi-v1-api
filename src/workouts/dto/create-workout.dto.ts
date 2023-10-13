import { IsDateString, IsInt } from 'class-validator';

export class CreateWorkoutDto {
  @IsInt()
  programId: number;
  workout_name: string;
  @IsDateString()
  date: Date;
}

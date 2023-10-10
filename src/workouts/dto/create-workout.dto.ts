import { IsDateString, IsInt } from 'class-validator';

export class CreateWorkoutDto {
  @IsInt()
  programId: number;

  @IsInt()
  exerciseId: number;

  @IsDateString()
  date: Date;
}

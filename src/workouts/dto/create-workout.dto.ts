import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsInt()
  programId: number;
  @IsString()
  workoutName: string;
  @IsDateString()
  date: Date;
}

import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  exercise_name: string;

  @IsString()
  body_part: string;

  @IsString()
  equipment: string;

  @IsInt()
  user_id: number;

  @IsInt()
  @IsOptional()
  best_set_id?: number;
}

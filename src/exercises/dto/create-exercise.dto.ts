import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  exerciseName: string;

  @IsString()
  bodyPart: string;

  @IsString()
  equipment: string;

  @IsInt()
  @IsOptional()
  bestSetId?: number;
}

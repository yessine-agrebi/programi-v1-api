import {
  IsNumber,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateSetDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  weight: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  reps: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  set_num: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  workout_id: number;

  @IsBoolean()
  @IsOptional()
  is_best_set: boolean;
}

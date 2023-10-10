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
  setNum: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  workoutId: number;

  @IsBoolean()
  @IsOptional()
  isBestSet: boolean;
}

import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  program_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  start_date: Date;

  @IsDateString()
  @IsOptional()
  end_date: Date;

  @IsInt()
  user_id: number;
}

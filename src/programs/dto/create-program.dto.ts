import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  programName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;

  @IsInt()
  userId: number;
}

import {
  IsEmail,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsInt()
  @IsOptional()
  age?: number;
}

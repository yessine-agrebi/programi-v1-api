import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  userId: number;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  height?: number;

  @Expose()
  weight?: number;

  @Expose()
  age?: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

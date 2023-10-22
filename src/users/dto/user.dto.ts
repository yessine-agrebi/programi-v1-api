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
  isAdmin: boolean;

  @Expose()
  profilePicture: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

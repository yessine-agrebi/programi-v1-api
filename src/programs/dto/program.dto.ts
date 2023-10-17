import { Expose, Transform } from 'class-transformer';

export class ProgramDto {
  @Expose()
  programId: number;

  @Expose()
  programName: string;

  @Expose()
  description: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  /**
   * if we used default id instead custom id user_id
   * and we dont have in program entity userId Column
   * then we can use this property
   * to eliminate fetching userId on each program
   */
  // @Expose()
  // @Transform(({ obj }) => obj.user.id)
  // userId: number;

  @Expose()
  userId: number;
}

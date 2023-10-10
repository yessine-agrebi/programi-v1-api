import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1696852976037 implements MigrationInterface {
  name = 'InitMigration1696852976037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "set" ("setId" SERIAL NOT NULL, "weight" double precision NOT NULL, "reps" integer NOT NULL, "setNum" integer NOT NULL, "workoutId" integer NOT NULL, "isBestSet" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workoutWorkoutId" integer, CONSTRAINT "PK_0920c1ccf5d023f11bc0015c989" PRIMARY KEY ("setId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workout" ("workoutId" SERIAL NOT NULL, "programId" integer NOT NULL, "exerciseId" integer NOT NULL, "date" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "programProgramId" integer, "exerciseExerciseId" integer, CONSTRAINT "PK_2df4cbfa5ef3bd063c53906c2e0" PRIMARY KEY ("workoutId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "program" ("programId" SERIAL NOT NULL, "programName" character varying NOT NULL, "secondName" character varying NOT NULL, "description" character varying, "startDate" date, "endDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_4402716c9ca2c8e92092d118944" PRIMARY KEY ("programId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "height" integer, "weight" double precision, "age" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercise" ("exerciseId" SERIAL NOT NULL, "exerciseName" character varying NOT NULL, "bodyPart" character varying NOT NULL, "equipment" character varying NOT NULL, "bestSetId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_86f3e278c7e9f71d49f9871e29d" PRIMARY KEY ("exerciseId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "set" ADD CONSTRAINT "FK_d617a45b40ebd30851e94e20e08" FOREIGN KEY ("workoutWorkoutId") REFERENCES "workout"("workoutId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_526a8475677d37c957d33482f4e" FOREIGN KEY ("programProgramId") REFERENCES "program"("programId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" ADD CONSTRAINT "FK_8f2d12b6b7e0d38a06a3774ef31" FOREIGN KEY ("exerciseExerciseId") REFERENCES "exercise"("exerciseId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program" ADD CONSTRAINT "FK_d593ec621c4a47fd51ab7f9a23d" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ADD CONSTRAINT "FK_0600c3e625643c18323ede9ae02" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercise" DROP CONSTRAINT "FK_0600c3e625643c18323ede9ae02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "program" DROP CONSTRAINT "FK_d593ec621c4a47fd51ab7f9a23d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_8f2d12b6b7e0d38a06a3774ef31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout" DROP CONSTRAINT "FK_526a8475677d37c957d33482f4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "set" DROP CONSTRAINT "FK_d617a45b40ebd30851e94e20e08"`,
    );
    await queryRunner.query(`DROP TABLE "exercise"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "program"`);
    await queryRunner.query(`DROP TABLE "workout"`);
    await queryRunner.query(`DROP TABLE "set"`);
  }
}

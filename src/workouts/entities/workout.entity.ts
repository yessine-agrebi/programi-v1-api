import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Set } from 'src/sets/entities/set.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  workoutId: number;

  @ManyToOne(() => Program, (program) => program.workouts)
  @JoinColumn({ name: 'programId' })
  program: Program;

  @Column()
  programId: number;

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.workout)  // Define the relationship with Exercise
  exercises: Exercise[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

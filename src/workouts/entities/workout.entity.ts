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

  @ManyToOne(() => Exercise, (exercise) => exercise.workouts)
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;

  @Column()
  exerciseId: number;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

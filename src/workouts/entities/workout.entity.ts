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

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  workout_id: number;

  @ManyToOne(() => Program, (program) => program.workouts)
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @Column()
  workout_name: string;

  @Column()
  program_id: number;

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.workout) // Define the relationship with Exercise
  exercises: Exercise[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

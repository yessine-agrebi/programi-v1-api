import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  setId: number;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  reps: number;

  @Column()
  setNum: number;

  @ManyToOne(() => Exercise, (workout) => workout.sets)

  @JoinColumn({ name: 'exerciseId' })
  workout: Exercise;

  sets: Set[];

  @Column()
  workoutId: number;

  @Column({ default: false })
  isBestSet: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

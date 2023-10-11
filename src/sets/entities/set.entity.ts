import { Exercise } from 'src/exercises/entities/exercise.entity';
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
  set_id: number;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  reps: number;

  @Column()
  set_num: number;

  @ManyToOne(() => Exercise, (workout) => workout.sets)
  @JoinColumn({ name: 'exercise_id' })
  workout: Exercise;

  sets: Set[];

  @Column()
  workout_id: number;

  @Column({ default: false })
  is_best_set: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

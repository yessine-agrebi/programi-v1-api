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
  @PrimaryGeneratedColumn({ name: 'set_id'})
  setId: number;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  reps: number;

  @Column({ name: 'set_num'})
  setNum: number;

  @ManyToOne(() => Exercise, (workout) => workout.sets)
  @JoinColumn({ name: 'exercise_id' })
  workout: Exercise;

  sets: Set[];

  @Column({ nullable: true, name: 'exercise_id' })
  exerciseId: number;

  @Column({ default: false, name: 'is_best_set' })
  isBestSet: boolean;

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAat: Date;
}

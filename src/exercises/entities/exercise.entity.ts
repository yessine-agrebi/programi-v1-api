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
import { User } from 'src/users/entities/user.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Set } from 'src/sets/entities/set.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column()
  exercise_name: string;

  @Column()
  body_part: string;

  @Column()
  equipment: string;

  @ManyToOne(() => User, (user) => user.exercises)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { nullable: true })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column({ nullable: true })
  workout_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  bestSetId?: number;

  @OneToMany(() => Set, (set) => set.sets)
  sets: Set[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

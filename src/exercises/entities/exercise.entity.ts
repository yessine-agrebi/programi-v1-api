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
  exerciseId: number;

  @Column()
  exerciseName: string;

  @Column()
  bodyPart: string;

  @Column()
  equipment: string;

  @ManyToOne(() => User, (user) => user.exercises)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Workout, (workout) => workout.exercises, {nullable: true})
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @Column({ nullable: true })
  workoutId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  bestSetId?: number;

  @OneToMany(() => Set, (set) => set.sets)
  sets: Set[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

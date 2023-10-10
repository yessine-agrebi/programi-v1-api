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

  @Column()
  userId: number;

  @Column({ nullable: true })
  bestSetId?: number;

  @OneToMany(() => Workout, (workout) => workout.exercise)
  workouts: Workout[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

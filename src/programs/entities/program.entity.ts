import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Workout } from 'src/workouts/entities/workout.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  programId: number;

  @Column()
  programName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @OneToMany(() => Workout, (workout) => workout.program)
  workouts: Workout[];

  @ManyToOne(() => User, (user) => user.programs)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

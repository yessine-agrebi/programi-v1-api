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
  program_id: number;

  @Column()
  program_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @OneToMany(() => Workout, (workout) => workout.program)
  workouts: Workout[];

  @ManyToOne(() => User, (user) => user.programs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

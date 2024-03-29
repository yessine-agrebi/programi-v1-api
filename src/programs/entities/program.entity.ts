import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Workout } from 'src/workouts/entities/workout.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn({ name: 'program_id' })
  programId: number;

  @Column({ name: 'program_name', nullable: false })
  programName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true, name: 'end_date' })
  endDate: Date;

  @OneToMany(() => Workout, (workout) => workout.program)
  workouts: Workout[];

  @ManyToOne(() => User, (user) => user.programs, { onDelete: 'SET NULL' }) //! CHECK
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  async afterInsert() {
    console.log('🚀 -----New program created----- ✅');
  }

  @AfterUpdate()
  async afterUpdate() {
    console.log('🚀 -----Program updated----- ✅');
  }

  @AfterRemove()
  async afterRemove() {
    console.log('🚀 -----Program removed----- ✅');
  }
}

import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
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
  @PrimaryGeneratedColumn({ name: 'exercise_id' })
  exerciseId: number;

  @Column({ name: 'exercise_name' })
  exerciseName: string;

  @Column({ name: 'body_part' })
  bodyPart: string;

  @Column()
  equipment: string;

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'SET NULL' }) //! CHECK
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { nullable: true })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column({ nullable: true, name: 'workout_id' })
  workoutId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ nullable: true, name: 'best_set_id' })
  bestSetId?: number;

  @OneToMany(() => Set, (set) => set.sets)
  sets: Set[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AfterInsert()
  async afterInsert() {
    console.log('🚀 -----New exercise created----- ✅');
  }

  @AfterUpdate()
  async afterUpdate() {
    console.log('🚀 -----Exercise updated----- ✅');
  }

  @AfterRemove()
  async afterRemove() {
    console.log('🚀 -----Exercise removed----- ✅');
  }
}

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
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Program } from 'src/programs/entities/program.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn({ name: 'workout_id'})
  workoutId: number;

  @ManyToOne(() => Program, (program) => program.workouts)
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @Column({ name: 'workout_name'})
  workoutName: string;

  @Column({ name: 'program_id'})
  programId: number;

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.workout) // Define the relationship with Exercise
  exercises: Exercise[];

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;

  @AfterInsert()
  async afterInsert() {
    console.log('🚀 -----New workout created----- ✅');
  }

  @AfterUpdate()
  async afterUpdate() {
    console.log('🚀 -----Workout updated----- ✅');
  }

  @AfterRemove()
  async afterRemove() {
    console.log('🚀 -----Workout removed----- ✅');
  }
}

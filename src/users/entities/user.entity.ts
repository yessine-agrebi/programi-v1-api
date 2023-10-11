import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Program } from 'src/programs/entities/program.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true, type: 'float' })
  weight?: number;

  @Column({ nullable: true })
  age?: number;

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @AfterInsert()
  async afterInsert() {
    console.log('New user created');
  }

  @AfterUpdate()
  async afterUpdate() {
    console.log('User updated');
  }

  @AfterRemove()
  async afterRemove() {
    console.log('User removed');
  }
}

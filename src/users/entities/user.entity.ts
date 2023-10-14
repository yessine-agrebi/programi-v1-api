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
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name'})
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AfterInsert()
  async afterInsert() {
    console.log('🚀 -----New user created----- ✅');
  }

  @AfterUpdate()
  async afterUpdate() {
    console.log('🚀 -----User updated----- ✅');
  }

  @AfterRemove()
  async afterRemove() {
    console.log('🚀 -----User removed----- ✅');
  }
}

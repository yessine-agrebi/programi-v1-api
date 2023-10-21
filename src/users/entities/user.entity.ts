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
import { PasswordReset } from './password-reset.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true, type: 'float' })
  weight?: number;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: true, name: 'is_admin' })
  isAdmin: boolean;
  @Column({ nullable: true, name: 'profile_picture' })
  profilePicture: string;

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @OneToMany(() => PasswordReset, (passwordReset) => passwordReset.user)
  passwordResets: PasswordReset[];

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

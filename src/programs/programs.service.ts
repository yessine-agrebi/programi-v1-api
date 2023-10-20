import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program) private programsRepository: Repository<Program>,
    private usersService: UsersService,
  ) {}

  async create(attributes: Partial<Program>, user: User) {
    try {
      const program = this.programsRepository.create(attributes);
      program.userId = user.userId;
      return await this.programsRepository.save(program);
    } catch (error) {
      throw error;
    }
  }

  findAll(userId?: number) {
    //excluse created_at and updated_at from the response
    if (userId) {
      return this.programsRepository.find({
        where: { userId: userId },
        select: [
          'programId',
          'programName',
          'description',
          'startDate',
          'endDate',
          'userId',
        ],
      });
    } else {
      return this.programsRepository.find({
        select: [
          'programId',
          'programName',
          'description',
          'startDate',
          'endDate',
          'userId',
        ],
      });
    }
  }

  async findOne(programId: number, currentUser?: User) {
    const program = await this.programsRepository.findOneBy({ programId });
    if (!program) {
      throw new NotFoundException(`Program with id ${programId} not found`);
    }
    if (program.userId !== currentUser.userId && !currentUser.isAdmin) {
      throw new UnauthorizedException(
        `You are not authorized to view this program`,
      );
    }
    return program;
  }

  async update(
    programId: number,
    attributes: Partial<Program>,
    currentUser: User,
  ) {
    const program = await this.programsRepository.findOneBy({ programId });
    if (!program) {
      throw new NotFoundException(`Program with id ${programId} not found`);
    }
    if (program.userId !== currentUser.userId && !currentUser.isAdmin) {
      throw new UnauthorizedException(
        `You are not authorized to update this program`,
      );
    }
    Object.assign(program, attributes);
    return this.programsRepository.save(program);
  }

  async remove(programId: number, currentUser: User) {
    const program = await this.findOne(programId, currentUser);
    if (!program) {
      throw new NotFoundException(`Program with id ${programId} not found`);
    }
    if (program.userId !== currentUser.userId && !currentUser.isAdmin) {
      throw new UnauthorizedException(
        `You are not authorized to delete this program`,
      );
    }
    return this.programsRepository.remove(program);
  }
}

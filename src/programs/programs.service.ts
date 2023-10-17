import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll() {
    //excluse created_at and updated_at from the response
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

  findOne(id: number) {
    return this.programsRepository.findOneBy({ programId: id });
  }

  async update(id: number, attributes: Partial<Program>) {
    const user = await this.usersService.findOne(attributes.userId);
    if (!user) {
      throw new NotFoundException(
        `User with id ${attributes.userId} not found`,
      );
    }
    try {
      const program = await this.programsRepository.findOneBy({
        programId: id,
      });
      if (!program) {
        throw new NotFoundException(`Program with id ${id} not found`);
      }
      Object.assign(program, attributes);
      return this.programsRepository.save(program);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const program = await this.findOne(id);
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return this.programsRepository.remove(program);
  }
}

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(attributes: Partial<User>) {
    const existingUser = await this.usersRepository.findOneBy({
      email: attributes.email,
    });
    if (existingUser) {
      throw new ConflictException(
        `User with email ${attributes.email} already exists`,
      );
    }
    try {
      const user = this.usersRepository.create(attributes);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.usersRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    // if (!user) {
    //   throw new NotFoundException(`User with email ${email} not found`);
    // }
    return user;
  }

  async update(id: number, attributes: Partial<User>) {
    if (attributes.email) {
      const existingUser = await this.usersRepository.findOneBy({
        email: attributes.email,
        userId: Not(id),
      });
      if (existingUser) {
        throw new ConflictException(
          `User with email ${attributes.email} already exists`,
        );
      }
    }
    try {
      const user = await this.usersRepository.findOneBy({ userId: id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      Object.assign(user, attributes);
      return this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.usersRepository.remove(user);
  }
}

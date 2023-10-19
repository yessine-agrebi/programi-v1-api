import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { plainToClass } from 'class-transformer';

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

  async findAll(
    filter: Partial<User>,
    search: string,
    page: number,
    limit: number,
    sort: string[],
  ) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.where(
        'LOWER(user.firstName) LIKE :search OR LOWER(user.lastName) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    Object.keys(filter).forEach((key) => {
      if (filter[key] !== undefined) {
        queryBuilder.andWhere(`LOWER(user.${key}) = LOWER(:${key})`, {
          [key]: filter[key],
        });
      }
    });

    if (
      !search &&
      Object.keys(filter).every((key) => filter[key] === undefined)
    ) {
      queryBuilder.skip((page - 1) * limit);
      queryBuilder.take(limit);
    }

    const stringColumns = ['firstName', 'lastName', 'email']; // Add other string columns if needed

    sort.forEach((sortParam) => {
      const direction = sortParam[0] === '-' ? 'DESC' : 'ASC';
      const column = sortParam[0] === '-' ? sortParam.slice(1) : sortParam;
      // queryBuilder.addOrderBy(`user.${column}`, direction);
      if (stringColumns.includes(column)) {
        queryBuilder.addOrderBy(`LOWER(user.${column})`, direction);
      } else {
        queryBuilder.addOrderBy(`user.${column}`, direction);
      }
    });

    const [data, total] = await queryBuilder.getManyAndCount();
    console.log(queryBuilder.getSql());

    // const users = data.map((user) => plainToClass(User, user));

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

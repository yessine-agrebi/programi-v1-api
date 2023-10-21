import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { plainToClass } from 'class-transformer';
import { BaseService } from 'src/common/base.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(usersRepository);
  }

  protected getSearchableColumns(): string[] {
    return ['firstName', 'lastName', 'email'];
  }

  protected getSortableStringColumns(): string[] {
    return ['firstName', 'lastName'];
  }

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

  async findOneWithoutException(id: number) {
    if (!id) {
      return null;
    }
    return this.usersRepository.findOneBy({ userId: id });
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

  async uploadProfilePicture(userId: number, imageFile: Express.Multer.File) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Save the file and get the file path
    const filePath = this.fileUploadService.saveFile(
      imageFile,
      'users-profile-pictures',
    );

    // Update the user entity with the file path
    user.profilePicture = filePath;
    await this.usersRepository.save(user);

    return user;
  }
}

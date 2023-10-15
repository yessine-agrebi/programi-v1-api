import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(attributes: Partial<User>) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(attributes.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create({
      ...attributes,
      password: result,
    });
    return user;
  }

  async signin(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;

      if (storedHash !== hash.toString('hex')) {
        throw new Error('Incorrect password');
      }

      return user;
    } catch (error) {
      // Log the error for further analysis
      console.error(error);

      throw new BadRequestException('Invalid credentials');
    }
  }
}

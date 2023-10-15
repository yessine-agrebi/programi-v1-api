import { Injectable } from '@nestjs/common';
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

  signin() {}
}

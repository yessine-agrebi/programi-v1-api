import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
    private readonly mailerService: MailerService,
  ) {}

  generateRandomPassword(length: number) {
    return randomBytes(length).toString('hex');
  }

  async signup(attributes: Partial<User>) {
    const salt = this.generateRandomPassword(8);
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

  async resetPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    const token = this.generateRandomPassword(20);

    const passwordReset = this.passwordResetRepository.create({ token, user });
    await this.passwordResetRepository.save(passwordReset);

    const resetUrl = `${process.env.RESET_URL}?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: process.env.GMAIL_USER,
      subject: 'Reset your password',
      template: 'reset-password',
      // text: `Your password reset token is ${token}`,
      context: {
        token,
        resetUrl,
      },
    });
    return token;
  }

  async changePassword(token: string, password: string) {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: {
        token,
      },
      relations: ['user'],
    });

    if (!passwordReset) {
      throw new BadRequestException('Invalid token');
    }

    const tokenExpiration = new Date(passwordReset.createdAt);
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    if (tokenExpiration.getTime() < new Date().getTime()) {
      throw new BadRequestException('Token expired');
    }

    const salt = this.generateRandomPassword(8);
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    passwordReset.user.password = result;
    await this.usersService.update(
      passwordReset.user.userId,
      passwordReset.user,
    );
    await this.passwordResetRepository.remove(passwordReset);
  }
}

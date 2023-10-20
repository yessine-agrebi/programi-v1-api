import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  Session,
  NotFoundException,
  Req,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SigninUserDto } from './dto/signin-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { MailerService } from '@nestjs-modules/mailer';
import { validatePagination } from 'src/utils/pagination.utils';
import validator from 'validator';
import { AdminGuard } from 'src/guards/admin.guard';

@UseGuards(ThrottlerGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Serialize(UserDto)
  @Post('/auth/signup')
  async signup(
    @Body() body: CreateUserDto,
    // @Session() session: any
  ) {
    const user = await this.authService.signup(body);
    // 2 conditions: change current user after signup or only after signin
    // session.userId = user.userId;
    return user;
  }

  @Serialize(UserDto)
  @Post('/auth/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SigninUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.userId;
    return user;
  }

  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  @Get('/auth/current-user')
  async whoAmI(@Session() session: any, @CurrentUser() user: User) {
    // DRY: don't repeat yourself
    // use Guards instead
    // if (!session.userId) {
    //   throw new NotFoundException('You are not logged in');
    // }
    return user;
  }

  @Post('/auth/signout')
  @HttpCode(HttpStatus.OK)
  signOut(@Session() session: any) {
    if (!session.userId) {
      throw new NotFoundException('You are not logged in');
    }
    delete session.userId;
    // session.userId = null;
  }

  @Post('/auth/reset-password')
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }

  @Post('/auth/new-password')
  @HttpCode(HttpStatus.OK)
  async newPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    await this.authService.changePassword(token, password);
    return {
      message: 'Password successfully changed',
    };
  }

  @Get('/auth/google')
  @UseGuards(PassportAuthGuard('google'))
  googleLogin() {}

  @Get('/auth/google/callback')
  @UseGuards(PassportAuthGuard('google'))
  async googleLoginCallback(
    @Req() req: any,
    @Res() res: any,
    @Session() session: any,
  ) {
    const user = req.user;

    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      session.userId = existingUser.userId;
      return {
        message: 'Google authentication successful',
        user: existingUser,
      };
    } else {
      const newUser = await this.usersService.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: this.authService.generateRandomPassword(16),
      });

      session.userId = newUser.userId;

      await this.mailerService.sendMail({
        to: newUser.email,
        // from: process.env.GMAIL_USER,
        subject: 'Welcome to Programi App',
        template: 'welcome',
        // text: `Your password reset token is ${token}`,
        context: {
          user: newUser,
        },
      });

      res.redirect(process.env.FRONTEND_URL);
    }
  }

  @Serialize(UserDto)
  @Get()
  async findAllUsers(
    @Query('email') email: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('search') search: string,
    @Query('sort', new DefaultValuePipe([]), ParseArrayPipe) sort: string[],
  ) {
    const maxLimit = 50;
    validatePagination(limit, page, maxLimit);

    if (search) {
      // search = search.trim().replace(/[^\w\s]/gi, '');
      search = validator.escape(search.trim());
    }

    const result = await this.usersService.findAll(
      { firstName, lastName, email },
      search,
      page,
      limit,
      sort,
    );

    return result;
  }

  @Get('/:id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}

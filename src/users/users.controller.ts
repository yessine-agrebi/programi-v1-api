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

@UseGuards(ThrottlerGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
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

  @Get()
  findAllUsers(@Query('email') email: string) {
    if (email) {
      return this.usersService.findOneByEmail(email);
    }
    return this.usersService.findAll();
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}

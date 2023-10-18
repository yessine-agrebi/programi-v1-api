import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppService } from './app.service';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsModule } from './sets/sets.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import typeorm from './typeorm/typeorm';
// import { User } from './users/entities/user.entity';
// import { Exercise } from './exercises/entities/exercise.entity';
// import { Workout } from './workouts/entities/workout.entity';
// import { Set } from './sets/entities/set.entity';
// import { Program } from './programs/entities/program.entity';
// import { PasswordReset } from './users/entities/password-reset.entity';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: [User, Exercise, Workout, Set, Program, PasswordReset],
      //! DANGER: in production set synchronize to false (NODE_ENV=production)
      /**
       * if a user creates a new program and you later change the Program entity to remove its relation with User
       * the userId column in the program table in the database will be dropped.
       * If you then bring back the relation, the userId column will be recreated
       * but the previous data won't be recovered, so it will return null.
       */
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [typeorm],
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   // imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) =>
    //     configService.get('typeorm'),
    // }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 100, // 100 requests
      },
    ]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      },
      defaults: {
        from: '"no-reply" ramic2018summer1@gmail.com',
      },
      template: {
        dir: process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ProgramsModule,
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
    SetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

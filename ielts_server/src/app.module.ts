import { UserAnswerController } from './module/user/controller/user-answer.controller';
import { GenerateJwtService } from './shared/jwt/generate-jwt.service';
import { AuthModule } from './module/auth/auth.module';
import { ExamModule } from './module/exam/exam.module';
import { QuestionModule } from './module/question/question.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './lib/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfig } from './lib/config/orm.config';
import { PostInterceptor } from './interceptor/post.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    AuthModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    // how to use
    // import ConfigModule to Feature, dj ConfigService, const dbUser = this.configService.get<string>('DATABASE_USER');
    //// get an environment variable
    // const dbUser = this.configService.get<string>('DATABASE_USER');
    // get a custom configuration value
    // const dbHost = this.configService.get<string>('database.host');
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeOrmPostgresConfig,
    }),
    SharedModule,
    UserModule,
    ExamModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [
    GenerateJwtService,
    AppService,

    {
      provide: APP_INTERCEPTOR,
      useClass: PostInterceptor,
    },
  ],
})
export class AppModule {}

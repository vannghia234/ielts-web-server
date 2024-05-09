import { PartModule } from './module/part/part.module';
import { UserAnswerController } from './module/user/controller/user-answer.controller';
import { GenerateJwtService } from './shared/service/generate-jwt.service';
import { AuthModule } from './module/auth/auth.module';
import { ExamModule } from './module/exam/exam.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './lib/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfig } from './lib/config/orm.config';
import { PostInterceptor } from './interceptor/post.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UploadModule } from './module/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { GroupQuestionModule } from './module/group-question/group-question.module';
@Module({
  imports: [
    GroupQuestionModule,
    PartModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
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
    UploadModule,
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

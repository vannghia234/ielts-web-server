import { WordService } from './shared/file-upload/word/word.service';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './lib/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfig } from './lib/config/orm.config';
@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [
        WordService, AppService],
})
export class AppModule {}

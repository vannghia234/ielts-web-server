import { FirebaseModule } from './shared/file-upload/firebase/firebase.module';
import { WordModule } from './shared/file-upload/word/word.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './lib/config/configuration';
import typeorm from './lib/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, typeorm],
      cache: true,
    }),
    // how to use
    // import ConfigModule to Feature, dj ConfigService, const dbUser = this.configService.get<string>('DATABASE_USER');
    //// get an environment variable
    // const dbUser = this.configService.get<string>('DATABASE_USER');
    // get a custom configuration value
    // const dbHost = this.configService.get<string>('database.host');
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('typeorm');
      },
    }),
    FirebaseModule,
    WordModule,
    SharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

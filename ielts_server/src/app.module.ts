import { FirebaseModule } from './shared/file-upload/firebase/firebase.module';
import { WordModule } from './shared/file-upload/word/word.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './module/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [FirebaseModule, WordModule, SharedModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

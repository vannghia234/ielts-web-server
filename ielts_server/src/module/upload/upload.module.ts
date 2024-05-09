import { Module } from '@nestjs/common';
import { UploadController } from './controller/upload.controller';
import { UploadService } from './service/upload.service';
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}

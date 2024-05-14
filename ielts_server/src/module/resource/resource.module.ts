import { Module } from '@nestjs/common';
import { UploadController } from './resource.controller';
import { UploadService } from './resource.service';
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class ResourceModule {}

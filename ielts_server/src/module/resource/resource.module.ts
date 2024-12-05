import { Module } from '@nestjs/common';
import { UploadController } from './resource.controller';
import { ResourceService } from './resource.service';
import { ImageUploadService } from './image.service';
import { AudioUploadService } from './audio.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [ResourceService, ImageUploadService, AudioUploadService],
  exports: [ResourceService, ImageUploadService, AudioUploadService],
})
export class ResourceModule {}

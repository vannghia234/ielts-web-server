import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Public } from 'src/shared/constant/meta-data';
import { ImageUploadService } from './image.service';
import { AudioUploadService } from './audio.service';

@Controller('resource')
export class UploadController {
  constructor(private imageService: ImageUploadService, private audioService: AudioUploadService) {}

  @Post('image')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const uploadFolder = path.join(process.cwd(), 'static/image');
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
      }
      const uniqueFilename = `${file.originalname}`;
      const filePath = path.join(uploadFolder, uniqueFilename);
      await fs.promises.writeFile(filePath, file.buffer);

      return {
        filename: `/image/${uniqueFilename}`,
      };
    } catch (error) {
      console.error('Error while uploading file:', error);
      throw error;
    }
  }

  @Post('audio')
  @Public()
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(@UploadedFile() audio: Express.Multer.File) {
    try {
      const uploadFolder = path.join(process.cwd(), 'static/audio');
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
      }
      const uniqueFilename = `${audio.originalname}`;
      const filePath = path.join(uploadFolder, uniqueFilename);
      await fs.promises.writeFile(filePath, audio.buffer);

      return {
        filename: `/audio/${uniqueFilename}`,
      };
    } catch (error) {
      console.error('Error while uploading audio:', error);
      throw error;
    }
  }
}

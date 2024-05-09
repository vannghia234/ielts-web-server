import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../service/upload.service';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Public } from 'src/shared/constant/meta-data';

@Controller()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const uploadFolder = path.join(process.cwd(), 'static');
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder);
      }
      const uniqueFilename = `${file.originalname}`;
      const filePath = path.join(uploadFolder, uniqueFilename);
      await fs.promises.writeFile(filePath, file.buffer);

      return {
        filename: `${uniqueFilename}`,
      };
    } catch (error) {
      console.error('Error while uploading file:', error);
      throw error;
    }
  }
}

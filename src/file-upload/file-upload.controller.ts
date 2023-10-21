import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('/api/v1/upload')
export class FileUploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  }
}

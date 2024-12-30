// server/src/images/images.controller.ts
import {
    Controller,
    Post,
    Get,
    UploadedFile,
    UseInterceptors,
    StreamableFile,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ImagesService } from './images.service';
  
  @Controller('images')
  export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
          throw new Error('No file uploaded');
        }
        const fileBuffer = file.buffer; 
        const contentType = file.mimetype;
        const originalFileName = file.originalname;
  
        // Call the service method to upload to S3
        const uploadResult = await this.imagesService.uploadImageToS3(fileBuffer, originalFileName, contentType);
  
        // Return the result to the client
        return {
          message: 'File uploaded successfully',
          data: uploadResult,
        };
    }
  
    @Get()
    async getImages(): Promise<string[]> {
      return this.imagesService.getImages();
    }
  }
// server/src/images/images.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class ImagesService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    // The SDK will now automatically pick up credentials from the instance's IAM role.
    this.s3Client = new S3Client({
      region: this.configService.get('REGION'),
    });
    this.bucketName = this.configService.get('BUCKET_NAME');
  }

  async uploadImageToS3(file: Buffer, originalFileName: string, contentType: string): Promise<any> {
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: `uploads/${Date.now()}-${originalFileName}`,
        Body: file,
        ContentType: contentType,
      },
    });
    try {
      const result = await upload.done();
      return result;
    } catch (error) {
      throw new Error(`Error uploading to S3: ${error.message}`);
    }
  }

  async getImages(): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.bucketName,
      Prefix: 'uploads/', // Customize your path here
    });

    try {
      const { Contents } = await this.s3Client.send(command);
      if (!Contents) {
        return [];
      }
      const imageUrls = Contents.map(
        (item) =>
          `https://${this.bucketName}.s3.${this.configService.get('REGION')}.amazonaws.com/${item.Key}`,
      );
      return imageUrls;
    } catch (error) {
      console.error('Error fetching images from S3:', error);
      throw new Error('Failed to fetch images from S3');
    }
  }
}
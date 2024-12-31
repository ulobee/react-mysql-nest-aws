// server/src/images/images.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class ImagesService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    // The SDK will now automatically pick up credentials from the instance's IAM role.
    this.s3Client = new S3Client({
      region: this.configService.get('REGION'),
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadImageToS3(file: Buffer, originalFileName: string, contentType: string): Promise<any> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${Date.now()}-${originalFileName}`, // Customize your path here
      Body: file,
      ContentType: contentType,
    };

    try {
      const command = new PutObjectCommand(params);
      const response = await this.s3Client.send(command);
      console.log('Upload successful:', response);

      // Construct the URL of the uploaded image
      const imageUrl = `https://${this.bucketName}.s3.${this.configService.get('REGION')}.amazonaws.com/${params.Key}`;

      // Return the URL and any other relevant data
      return {
        url: imageUrl,
        key: params.Key,
        response: response,
      };
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw new Error('Failed to upload image to S3');
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
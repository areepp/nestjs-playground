import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileStorageService {
  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    },
    region: this.configService.get('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(file: Buffer, key?: string) {
    const id = uuidv4();
    const generatedKey = key ?? id;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjs-playground-bucket',
        Key: generatedKey,
        Body: file,
      }),
    );

    return `https://${this.configService.get('AWS_S3_BUCKET_NAME')}.s3.${this.configService.get('AWS_S3_REGION')}.amazonaws.com/${generatedKey}`;
  }
}

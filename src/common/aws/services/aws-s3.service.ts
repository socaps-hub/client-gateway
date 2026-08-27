import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuid } from 'uuid';
import { envs } from 'src/config';

@Injectable()
export class AwsS3Service {
  private readonly logger = new Logger('AwsS3Service');
  private readonly s3: S3Client;
  private readonly bucket = envs.awsS3BucketName;

  constructor() {
    this.s3 = new S3Client({
      region: envs.awsS3Region,
      credentials: {
        accessKeyId: envs.awsAccessKeyId,
        secretAccessKey: envs.awsSecretAccessKey,
      },
    });
  }

  async uploadExcel(
    file: FileUpload,
    folder = 'radiografias',
  ): Promise<{ key: string; url: string }> {
    if (!file) {
      throw new BadRequestException('Archivo no recibido.');
    }

    const { createReadStream, filename, mimetype } = file;

    // Validar extensión del archivo.
    const extension = filename.split('.').pop()?.toLowerCase();

    const validExtensions = ['xlsx', 'xls'];

    if (!extension || !validExtensions.includes(extension)) {
      throw new BadRequestException(
        'Formato de archivo inválido. Solo se permiten archivos Excel (.xlsx, .xls).',
      );
    }

    // Validar MIME conocido de Excel.
    const validMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/octet-stream',
    ];

    if (!validMimeTypes.includes(mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo inválido (${mimetype}). Solo se permiten archivos Excel.`,
      );
    }

    const key = `${folder}/${uuid()}-${filename}`;

    const stream = createReadStream();
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    if (!buffer.length) {
      throw new BadRequestException('El archivo Excel está vacío.');
    }

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
        ContentLength: buffer.length,
      }),
    );

    const url = `https://${this.bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

    return {
      key,
      url,
    };
  }

  public async getSignedDownloadUrl(
    key: string,
    expiresIn = 300,
  ): Promise<string> {
    if (!key) {
      throw new BadRequestException('No se recibió la clave del archivo.');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3, command, {
      expiresIn,
    });
  }

  async uploadBuffer(params: {
    buffer: Buffer;
    key: string;
    contentType: string;
  }) {
    const { buffer, key, contentType } = params;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        ContentLength: buffer.length,
      }),
    );

    const url = `https://${this.bucket}.s3.${envs.awsS3Region}.amazonaws.com/${key}`;

    return { key, url };
  }
}

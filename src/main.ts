import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main Gateway')  

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [{
      path: '/health',
      method: RequestMethod.GET,
    }]
  })
  app.enableCors()

  // ⚙️ Habilita procesamiento multipart para GraphQL Upload
  app.use(graphqlUploadExpress({ maxFileSize: 10_000_000, maxFiles: 1 }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters( new RpcCustomExceptionFilter() )

  await app.listen(envs.port);

  console.log('Health Check configured');
  
  logger.log(`Gateway running on port ${ envs.port }`)
}
bootstrap();

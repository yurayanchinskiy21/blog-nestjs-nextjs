import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function appCreate(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Blog app API')
    .setDescription('Use the base API URL as http://localhost:3030')
    .setTermsOfService('http://localhost:3030/terms-of-service')
    .setLicense('MIT License', 'https://google.com')
    .addServer('http://localhost:3030')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.getOrThrow<string>('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.getOrThrow<string>(
        'appConfig.awsSecretAccessKey',
      ),
    },
    region: configService.getOrThrow<string>('appConfig.awsRegion'),
  });

  app.enableCors();
}

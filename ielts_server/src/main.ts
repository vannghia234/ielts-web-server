import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './module/user/service/user.service';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ielts test swagger')
    .setDescription('the ielts test description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('ielts')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  const configService: ConfigService = new ConfigService();
  const b = configService.get<boolean>('app.isDev');
  await app.listen(process.env.APP_PORT);
  new Logger().debug('Server is running with port ' + process.env.APP_PORT);
  new Logger().debug('Go to swagger ' + 'http://localhost:3000/api/');
}
bootstrap();

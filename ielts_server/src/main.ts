import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './module/user/service/user.service';
import { SwaggerModule } from '@nestjs/swagger';
import { GenerateJwtService } from './shared/service/generate-jwt.service';
import { configSwagger } from './lib/config/swagger.config';

async function bootstrap() {
  GenerateJwtService.generateToken();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
  new Logger('main').debug(
    'Server is running with port ' + process.env.APP_PORT,
  );
  new Logger('main').debug(
    `Go to swagger  + http://localhost:${process.env.APP_PORT}/api/`,
  );

  new Logger('main').debug(`SOCKET ON PORT  + http://localhost:${8001}/`);
}
bootstrap();

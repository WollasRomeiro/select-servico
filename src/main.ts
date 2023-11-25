import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISwaggerMiddleware, SwaggerMiddleware } from 'util/swagger';
import { ValidationPipe } from '@nestjs/common';

const Swagger: ISwaggerMiddleware = new SwaggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await Swagger.start(app);

  await app.listen(3000);
}
bootstrap();

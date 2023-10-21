import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISwaggerMiddleware, SwaggerMiddleware } from 'util/swagger';

const Swagger: ISwaggerMiddleware = new SwaggerMiddleware();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Swagger.start(app);

  await app.listen(3000);
}
bootstrap();

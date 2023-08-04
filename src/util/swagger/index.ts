import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface ISwaggerMiddleware {
  start(app: INestApplication): Promise<void>;
}

export class SwaggerMiddleware implements ISwaggerMiddleware {
  async start(app: INestApplication): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle('Select Servicos API')
      .setDescription('Application dedicated to cretion of resources from select-servicos systems')
      .setVersion(process.env.npm_package_version)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);
  }
}

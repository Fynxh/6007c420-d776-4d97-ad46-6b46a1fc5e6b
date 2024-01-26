import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './configs/swagger/swagger.config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port: number = config.get<number>('APP_PORT');
  const host: string = config.get<string>('HOST');
  const env: string = config.get<string>('NODE_ENV');

  if (env === 'production') {
    app.use(helmet());
  }

  app.use(compression());

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app, config);

  await app.listen(port, host, () => {
    console.log(
      `\x1b[42m[Customer Insight]\x1b[0m Running on \x1b[42m${host}:${port}\x1b[0m with mode \x1b[42m${env}\x1b[0m`,
    );
  });
}

function setupSwagger(app: INestApplication, config: ConfigService): void {
  const appName: string = config.get<string>('APP_NAME');
  const version: number = config.get<number>('APP_VERSION');
  const swagger = new SwaggerConfig({
    app,
    title: appName,
    description: 'Ambisius chalange api documentation',
    version: String(version),
    path: '/api/doc',
  });

  swagger.setup();
}

bootstrap();

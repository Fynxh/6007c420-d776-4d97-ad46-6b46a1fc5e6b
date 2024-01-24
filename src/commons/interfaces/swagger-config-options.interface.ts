import { INestApplication } from '@nestjs/common';

export interface ISwaggerConfigOptions {
  app: INestApplication;
  title: string;
  description: string;
  path: string;
  version: string;
}

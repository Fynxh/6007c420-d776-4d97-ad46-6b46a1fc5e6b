import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerConfigOptions } from '../../commons/interfaces/swagger-config-options.interface';

export class SwaggerConfig {
  private options: ISwaggerConfigOptions;

  constructor(options: ISwaggerConfigOptions) {
    this.options = options;
  }

  setup() {
    const { app, path } = this.options;

    const swaggerDocConfig = this.createDocumentConfig();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocConfig);
    SwaggerModule.setup(path, app, swaggerDocument);
  }

  private createDocumentConfig(): Omit<OpenAPIObject, 'paths'> {
    const { title, description, version } = this.options;

    const docConfig = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    return docConfig;
  }
}

import type { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import temple from '@ossph/temple/compiler';
import engine from '@ossph/temple-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cwd = path.dirname(__dirname);
  app.useStaticAssets(path.join(cwd, 'public'));
  app.setBaseViewsDir(path.join(cwd, 'pages'));

  const compiler = temple({ cwd });

  app.engine('dtml', engine(compiler));
  app.setViewEngine('dtml');

  await app.listen(3000);
}
bootstrap();

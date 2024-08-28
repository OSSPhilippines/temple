import type { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { view } from '@ossph/temple-express';
import { TempleService } from './temple/temple.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cwd = path.dirname(__dirname);
  app.useStaticAssets(path.join(cwd, 'public'));
  app.setBaseViewsDir(path.join(cwd, 'pages'));

  const compiler = app.get<TempleService>(TempleService).compiler;

  app.engine('dtml', view(compiler));
  app.setViewEngine('dtml');

  await app.listen(3000);
}
bootstrap();

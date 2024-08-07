import type { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import temple from '@ossph/temple/compiler';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cwd = path.dirname(__dirname);
  app.useStaticAssets(path.join(cwd, 'public'));
  app.setBaseViewsDir(path.join(cwd, 'templates'));

  const compiler = temple({ cwd });

  app.engine(
    'tml',
    async (
      filePath: string,
      options: Record<string, any>,
      callback: (err: Error | null, results: string | undefined) => void,
    ) => {
      const { document } = await compiler.import(filePath);
      const results = document.render(options);
      callback(null, results);
    },
  );

  app.setViewEngine('tml');

  await app.listen(3000);
}
bootstrap();

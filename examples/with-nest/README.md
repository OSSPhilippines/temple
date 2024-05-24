# ⛩️ Temple - NestJS Example

Boilerplate using NestJS and Temple as a template engine.

## Integration Example

```js
//... main.ts ...

import type { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { document } from '@ossph/temple/server';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cwd = path.dirname(__dirname);
  app.useStaticAssets(path.join(cwd, 'public'));
  app.setBaseViewsDir(path.join(cwd, 'templates'));

  const template = document({
    buildFolder: '../.temple',
    cwd: cwd,
    useCache: false,
  });

  app.engine(
    'tml',
    async (
      filePath: string,
      options: Record<string, any>,
      callback: (err: Error | null, results: string | undefined) => void,
    ) => {
      const render = await template(filePath);
      const results = render(options);
      callback(null, results);
    },
  );

  app.setViewEngine('tml');

  await app.listen(3000);
}
bootstrap();

//... app.controller.ts ...

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage(@Res() res: Response) {
    return res.render('page', {
      title: this.appService.getTitle(),
      description: this.appService.getDescription(),
      start: this.appService.getStart(),
      list: this.appService.getList(),
    });
  }
}
```
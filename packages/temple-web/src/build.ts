import fs from 'fs';
import path from 'path';
import { globSync as glob } from 'fast-glob';
import { document } from '@ossph/temple/server';


const build = path.resolve(__dirname, '../../../docs');
const template = document({ cwd: __dirname });

// first build all the templates
glob(
  'templates/**.page.{tml,html}', 
  { cwd: __dirname }
).forEach(async file => {
  //ex. templates/app.page.tml
  const render = await template(`./${file}`);
  const results = render();
  //from 'templates/app.page.tml' to 'docs/app.html'
  const destination = file.substring(10).replace('.page.tml', '.html');
  const absolute = path.resolve(build, destination);
  if (!fs.existsSync(path.dirname(absolute))) {
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
  }
  fs.writeFileSync(absolute, results);
});
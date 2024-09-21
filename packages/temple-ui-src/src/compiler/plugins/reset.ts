import Styleset from '@ossph/temple/dist/style/StyleSet';
import { stylemap } from '@ossph/temple/dist/style/StyleMap';

export function reset(sheet: string, brand: string) {
  const directive = `@${brand} reset;`;
  if (!sheet.includes(directive)) {
    return sheet;
  }
  const styleset = new Styleset();
  styleset.set('html, body', stylemap()
    .add('height', '100%')
    .add('margin', 0)
    .add('padding', 0)
    .add('width', '100%')
  ).set('h1, h2, h3, h4, h5, h6, p', stylemap()
    .add('margin', 0)
    .add('padding', 0)
  ).set('a', stylemap()
    .add('text-decoration', 'none')
  )
  return sheet.replaceAll(directive, styleset.toString());
};
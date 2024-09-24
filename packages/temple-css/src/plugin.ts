import type { 
  TempleCompiler, 
  DocumentBuilder
} from '@ossph/temple/compiler';
import type { TempleCSSOptions } from './types';

import { block, inline } from './plugins/display';
import { display, opacity, visibility } from './plugins/fouc';
import { reset } from './plugins/reset';
import { theme } from './plugins/theme';
import { utilities } from './plugins/utilities';
import css from './css';

import { expressions, ranges, literals } from './definitions';
import { expression, range, literal } from './Stylers';

export default function plugin(options: TempleCSSOptions = {}) {
  const stylers = [
    range(ranges()),
    expression(expressions()),
    literal(literals())
  ];
  return function withCSS(compiler: TempleCompiler) {
    //whenever a component is updated, refresh the document stylesheet
    compiler.emitter.on('dev-updated-component', async e => {
      const { document, updates } = e.params;
      updates[e.params.document.id].push(`;(() => {  
        const links = Array.from(document.head.querySelectorAll('link'));
        const stylesheet = links.find(link => link.href.includes('${document.id}.css'));
        if (!stylesheet) {
          return;
        }
        const [ pathname, query ] = stylesheet.href.split('?');
        const params = new URLSearchParams(query || '');
        params.set('v', Date.now());
        stylesheet.href = pathname + '?' + params.toString();
      })();`);
    });
    //whenever a document style is built, replace directives with actual styles
    compiler.emitter.on('built-styles', async e => {
      const builder = e.params.builder as DocumentBuilder;
      const { document } = builder;
      const contents = { 
        client: await builder.client(),
        server: document.contents
      };
      const sourceCode = e.params.sourceCode as string;
      const stylesheet = css(options)
        .plugin(reset)
        .plugin(theme)
        .plugin(block(document))
        .plugin(inline(document))
        .plugin(display(document))
        .plugin(opacity(document))
        .plugin(visibility(document))
        .plugin(utilities(document, { stylers, contents }))
        .upgrade(sourceCode);
      e.set(stylesheet);
      e.params.sourceCode = stylesheet;
    });
  };
};
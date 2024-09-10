import type { 
  TempleCompiler, 
  DocumentBuilder 
} from '@ossph/temple/compiler';
import type { TempleUIOptions } from './types';

import { component } from './plugins/component';
import { block, inline } from './plugins/display';
import { display, opacity, visibility } from './plugins/fouc';
import { reset } from './plugins/reset';
import { theme } from './plugins/theme';
import { utilities } from './plugins/utilities';
import templeui from './templeui';

import { expressions, literals, ranges } from './data/definitions';
import { expression, literal, range } from './Stylers';

export default function tui(options: TempleUIOptions = {}) {
  const stylers = [
    expression(expressions()),
    literal(literals()),
    range(ranges())
  ];
  return function withTui(compiler: TempleCompiler) {
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
      const { document } = e.params.builder as DocumentBuilder;
      const sourceCode = e.params.sourceCode as string;
      e.set(templeui(options)
        .plugin(reset)
        .plugin(theme)
        .plugin(block(document))
        .plugin(inline(document))
        .plugin(display(document))
        .plugin(opacity(document))
        .plugin(visibility(document))
        .plugin(component(document, { stylers }))
        .plugin(utilities(document, { stylers }))
        .upgrade(sourceCode)
      );
    });
  };
};
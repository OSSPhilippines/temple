import type { DocumentBuilder, TempleCompiler } from '@ossph/temple/compiler';
import type { Config } from 'tailwindcss';

import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export function tailwind(config: Config) {
  return function withTui(compiler: TempleCompiler) {
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
    
    compiler.emitter.on('built-styles', async e => {
      const { document } = e.params.builder as DocumentBuilder;
      const sourceCode = e.params.sourceCode as string;
      //if there is a tailwind directive
      if (!sourceCode.includes('@tailwind')) {
        return;
      }
      //find all the components
      const content = Object.values(document.registry).map(
        component => component.absolute
      );
      //add the document to the content
      content.push(document.absolute);
      const css = postcss([ autoprefixer, tailwindcss({
        ...config,
        content: [ ...content, ...config.content as string[] ]
      } as Config)]);
      const styles = await css.process(sourceCode, { 
        from: undefined 
      });
      e.params.sourceCode = styles.css;
      e.set(styles.css);
    });
  };
};
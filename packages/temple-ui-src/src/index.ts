import type { TempleCompiler, DocumentBuilder } from '@ossph/temple/compiler';

import fs from 'fs';
import path from 'path';

import uis from './data/components.json';
import utilities from './data/utilities.json';

const extname = '.css';
const vfs = new Map<string, string>(); 

export function getStyle(group: string, directive: string) {
  //ex. node_modules/@ossph/temple-ui/styles/block/alert.css
  const file = path.join(__dirname, group, directive + extname);
  //if the file is not registered
  if (!vfs.has(file)) {
    //register the file either way
    vfs.set(file, fs.existsSync(file) 
      ? fs.readFileSync(file, 'utf-8')
      : ''
    );
  }
  //return the cached contents
  return vfs.get(file) as string;
};

export function tui(options: { brand?: string } = {}) {
  const brand = typeof options.brand === 'string' ? options.brand : 'tui';
  const prefix = brand.length ? `${brand}-` : '';

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
        stylesheet.href = stylesheet.href.replace(/\\?\\d+$/, '?' + Date.now());
      })();`);
    });
    //whenever a document style is built, replace directives with actual styles
    compiler.emitter.on('built-styles', async e => {
      const { document } = e.params.builder as DocumentBuilder;
      let sourceCode = e.params.sourceCode as string;

      //if the source code includes @tui reset;
      if (sourceCode.includes('@tui reset;')) {
        //determine reset file path 
        //ie. [root]/styles/common/reset.css
        const reset = path.join(__dirname, 'common', 'reset.css');
        //emit pre insert reset styles event
        const pre = await compiler.emitter.waitFor(
          'tui-insert-reset', 
          { document, sourceCode, file: reset }
        );
        //get the contents of the theme file
        const contents = pre.data as string || (
          fs.existsSync(reset) ? fs.readFileSync(reset, 'utf-8') : ''
        );
        //replace @tui theme; with the contents of the theme file
        sourceCode = sourceCode.replace(
          '@tui reset;', 
          contents.trim().replaceAll('.tui-', `.${prefix}`)
        );
        //emit post inserted reset styles event
        const post = await compiler.emitter.waitFor(
          'tui-inserted-reset', 
          { document, sourceCode, file: reset, contents }
        );
        sourceCode = post.data as string || sourceCode;
      }

      //if the source code includes @tui theme;
      if (sourceCode.includes('@tui theme;')) {
        //determine theme file path 
        //ie. [root]/styles/common/theme.css
        const theme = path.join(__dirname, 'common', 'theme.css');
        //emit pre insert theme styles event
        const pre = await compiler.emitter.waitFor(
          'tui-insert-theme', 
          { document, sourceCode, file: theme }
        );
        //get the contents of the theme file
        const contents = pre.data as string || (
          fs.existsSync(theme) ? fs.readFileSync(theme, 'utf-8') : ''
        );
        //replace @tui theme; with the contents of the theme file
        sourceCode = sourceCode.replace(
          '@tui theme;', 
          contents.trim().replaceAll('.tui-', `.${prefix}`)
        );
        //emit post inserted theme styles event
        const post = await compiler.emitter.waitFor(
          'tui-inserted-theme', 
          { document, sourceCode, file: theme, contents }
        );
        sourceCode = post.data as string || sourceCode;
      }

      //if the source code includes @tui utilities;
      if (sourceCode.includes('@tui utilities;')) {
        const stylesheet: Record<string, string[]> = {};
        //find all the component files
        const files = Object.values(document.registry).map(
          component => component.absolute
        );
        //add the document to the files
        files.push(document.absolute);
        //loop through the files
        for (const file of files) {
          //read the file contents
          const contents = fs.readFileSync(file, 'utf-8');
          //loop through definitions in the utilities
          for (const definition of utilities) {
            //extract the media, selector, and style from the definition
            const { media, selector, style } = definition;
            //determine the query
            const query = `${prefix}${selector}`;
            //if the contents include the query
            if (contents.includes(query)) {
              //create the styles
              const styles = `.${query} { ${style} }`;
              //if the media is not in the stylesheet
              if (!stylesheet[media]) {
                //add the media to the stylesheet
                stylesheet[media] = [];
              }
              //add the styles to the media
              stylesheet[media].push(styles);
            }
          }
        }
        const insertions: string[] = [];
        //loop through the stylesheet
        for (const media in stylesheet) {
          //if the media is 'all'
          if (media === 'all') {
            //add the styles to the insertion
            insertions.push(stylesheet[media].join('\n'));
          } else {
            //create the media query and add to insertion
            insertions.push(`@media (max-width: ${media}) {\n  ${
              stylesheet[media].join('\n  ')
            }\n}`);
          }
        }
        //emit insert utilities styles event
        await compiler.emitter.waitFor(
          'tui-insert-utilities', 
          { document, sourceCode, insertions }
        );
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui utilities;', 
          insertions.join('\n')
        );
      }

      //loop through the uis
      for (const ui of uis) {
        //expand the group name and directive from the component
        const { group, name, directive }= ui;
        //determine the style directive 
        //ie. @tui block-alert;
        const style = `@tui ${group}-${directive};`;
        //if @tui block-alert; is in the styles
        if (directive && sourceCode.includes(style)) {
          //emit pre insert component styles event
          const pre = await compiler.emitter.waitFor(
            'tui-insert-component', 
            { document, sourceCode, ui }
          );
          //replace @tui block-alert; with the actual styles
          const styles =  pre.data as string 
            || getStyle(group, String(directive));
          sourceCode = sourceCode.replace(
            style, 
            styles.replaceAll('.tui-', `.${prefix}`)
          );
          continue;
        }
        //@tui block-alert; is not in the styles...
        //then try to determine the component import source
        //ie. @ossph/temple-ui/block/alert.tml
        const source = `@ossph/temple-ui/${group}/${name}.tml`;
        //determine if the source was imported
        const imported = Object.values(document.registry).find(
          component => component.source === source
        );
        //if the source was imported
        if (imported) {
          //emit pre insert component styles event
          const pre = await compiler.emitter.waitFor(
            'tui-insert-component', 
            { document, sourceCode, ui }
          );
          const styles =  pre.data as string 
            || getStyle(group, String(directive));
          //add the styles to the source code
          sourceCode += styles.replaceAll('.tui-', `.${prefix}`);
        }
      }

      e.params.sourceCode = sourceCode;
      e.set(sourceCode);
    });
  };
}
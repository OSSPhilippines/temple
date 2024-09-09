import type { 
  TempleCompiler, 
  DocumentBuilder 
} from '@ossph/temple/compiler';

import fs from 'fs';
import path from 'path';

import utilities from './utilities';
import uis from './assets/components.json';
import {
  getMatches,
  getStyle,
  addStaticStyles,
  addRangeStyles,
  addRegExpStyles
} from './helpers';

export function tui() {
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
      let sourceCode = e.params.sourceCode as string;

      //if the source code includes @tui reset;
      if (sourceCode.includes('@tui reset;')) {
        //determine reset file path 
        //ie. [root]/styles/common/reset.css
        const reset = path.join(__dirname, 'assets', 'reset.css');
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
        sourceCode = sourceCode.replace('@tui reset;', contents.trim());
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
        const theme = path.join(__dirname, 'assets', 'theme.css');
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
        sourceCode = sourceCode.replace('@tui theme;', contents.trim());
        //emit post inserted theme styles event
        const post = await compiler.emitter.waitFor(
          'tui-inserted-theme', 
          { document, sourceCode, file: theme, contents }
        );
        sourceCode = post.data as string || sourceCode;
      }

      //if the source code includes @tui block;
      if (sourceCode.includes('@tui block;')) {
        const blocks = Object.values(document.registry).map(
          component => component.brand 
            ? `${component.brand}-${component.tagname}` 
            : component.tagname
        ).flat().map(tagname => `${tagname} { display: block; }`);
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui block;', 
          blocks.join('\n')
        );
       //if the source code includes @tui inline-block;
      } else if (sourceCode.includes('@tui inline-block;')) {
        const blocks = Object.values(document.registry).map(
          component => component.brand 
            ? `${component.brand}-${component.tagname}` 
            : component.tagname
        ).flat().map(tagname => `${tagname} { display: inline-block; }`);
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui inline-block;', 
          blocks.join('\n')
        );
      }

      //if the source code includes @tui fouc-opacity;
      if (sourceCode.includes('@tui fouc-opacity;')) {
        const blocks = Object.values(document.components).map(
          component => component.brand 
            ? `${component.brand}-${component.tagname}` 
            : component.tagname
        ).flat().map(tagname => `${tagname}:not(:defined) { opacity: 0; }`);
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui fouc-opacity;', 
          blocks.join('\n')
        );
      //if the source code includes @tui fouc-visibility;
      } else if (sourceCode.includes('@tui fouc-visibility;')) {
        const blocks = Object.values(document.components).map(
          component => component.brand 
            ? `${component.brand}-${component.tagname}` 
            : component.tagname
        ).flat().map(tagname => `${tagname}:not(:defined) { visibility: hidden; }`);
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui fouc-visibility;', 
          blocks.join('\n')
        );
      //if the source code includes @tui fouc-none;
      } else if (sourceCode.includes('@tui fouc-none;')) {
        const blocks = Object.values(document.components).map(
          component => component.brand 
            ? `${component.brand}-${component.tagname}` 
            : component.tagname
        ).flat().map(tagname => `${tagname}:not(:defined) { display: none; }`);
        //replace the utilities with the insertion
        sourceCode = sourceCode.replace(
          '@tui fouc-none;', 
          blocks.join('\n')
        );
      //if the source code includes @tui fouc-opacity-all;
      }

      //if the source code includes @tui utilities;
      if (sourceCode.includes('@tui utilities;')) {
        const stylesheet: Record<string, string[]> = {};
        //remove duplicates values from matches
        const matches = Array.from(new Set([
          //find all the component matches
          ...Object.values(document.registry).map(
            component => getMatches(component.contents)
          ).flat(),
          //add the document to the matches
          ...getMatches(document.contents)
        ]));

        //loop through definitions in the utilities
        for (const definition of utilities) {
          if (definition.type === 'static') {
            addStaticStyles(definition, matches, stylesheet);
          } else if (definition.type === 'range') {
            addRangeStyles(definition, matches, stylesheet);
          } else if (definition.type === 'regexp') {
            addRegExpStyles(definition, matches, stylesheet);
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
          //add the styles to the source code
          sourceCode = sourceCode.replace(style, styles);
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
          sourceCode += styles;
        }
      }

      e.params.sourceCode = sourceCode;
      e.set(sourceCode);
    });
  };
};
import type { FileSystem } from '@ossph/temple/compiler';
import type { Plugin, ComponentPluginOptions } from '../types';

import path from 'path';
import { Component } from '@ossph/temple/compiler';
import StyleParser from '../StyleParser';
import Stylers from '../Stylers';

import { components } from '../data/components';

export function getAsset(file: string|boolean, fs: FileSystem) {
  //if the file is not a string
  if (typeof file !== 'string') {
    return '';
  }
  //determine the asset path
  const asset = path.resolve(__dirname, `../../styles/${file}.css`);
  //return the asset contents if it exists
  return fs.existsSync(asset) ? fs.readFileSync(asset, 'utf8') : '';
};

export function getUtilities(
  source: string, 
  document: Component, 
  stylers: Stylers
) {
  const type = 'component';
  const { fs, cwd, brand } = document;
  //make a new component
  const component = new Component(source, { cwd, fs, brand, type });
  //make a new parser
  const parser = new StyleParser({ cwd, fs });
  //add the component to the parser
  parser.set(component.absolute, component.contents);
  //parse the styles
  return stylers.parse(parser);
};

export function component(
  document: Component, 
  options: ComponentPluginOptions = {}
): Plugin {
  //destructure the options
  const { stylers: processors = [] } = options;
  //make a new style generator
  const stylists = new Stylers(processors);

  return (sheet: string, brand: string) => {
    for (const { name, component, styles } of components) {
      //determine source file
      const source = `@ossph/temple-ui/${component}.tml`;
      //determine the directive
      const directive = `@${brand} ui-${name};`;
      //if the directive is in the stylesheet
      if (sheet.includes(directive)) {
        //parse the styles
        sheet = sheet.replaceAll(directive, [
          getUtilities(source, document, stylists).toString(),
          getAsset(styles, document.fs)
        ].join(''));
        //dont add duplicate styles
        continue;
      }
      //the directive is not in the stylesheet
      //determine if the source was imported
      if (Object.values(document.registry).find(
        component => component.source === source
      )) {
        //add the styles to the sheet
        sheet += getAsset(styles, document.fs);
      }
    };
    return sheet;
  };
};
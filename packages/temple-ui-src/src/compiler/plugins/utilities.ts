import type { Component } from '@ossph/temple/compiler';
import type { UtilityPluginOptions } from '../types';

import StyleParser from '../StyleParser';
import Stylers from '../Stylers';

export function utilities(
  document: Component, 
  options: UtilityPluginOptions = {}
) {
  //destructure the options
  const { 
    files = [], 
    contents = {},
    stylers: processors = []
  } = options;
  //add default contents
  contents[document.absolute] = document.contents;
  Object.values(document.registry).map(component => {
    contents[component.absolute] = component.contents;
  });
  //make a new style generator
  const stylers = new Stylers(processors);
  //make a new parser
  const { fs, cwd } = document;
  const parser = new StyleParser({ fs, cwd });
  //add all the files to the parser
  files.forEach(file => parser.add(file));
  //add all the contents to the parser
  Object.entries(contents).forEach(([filePath, content]) => {
    parser.set(filePath, content);
  });
  //return the utilities plugin
  return (sheet: string, brand: string) => {
    const directive = `@${brand} utilities;`;
    if (!sheet.includes(directive)) {
      return sheet;
    }
    //return the stylesheet
    const styles = stylers.parse(parser).toString();
    return sheet.replaceAll(directive, styles);
  };
};
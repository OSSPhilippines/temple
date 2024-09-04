import fs from 'fs';
import path from 'path';

const input = path.resolve(__dirname, '../src/common/utilities.css');
const output = path.resolve(__dirname, '../src/data/utilities.json');
const extractor = /(\.tui\-[^ ]+),{0,1} {0,1}(\.tui\-[^ ]+){0,1} \{([^\}]+)\}/;

async function main() {
  let media = 'all';
  const definitions: { 
    media: string, 
    selector: string, 
    style: string 
  }[] = [];
  fs.readFileSync(input, 'utf8').split('\n').forEach(line => {
    //if it's a media line
    if (line.includes('@media')) {
      //update media
      media = line.split(' ')[2].replace(')', '');
      return;
    }
    //get all matches
    const match = line.trim().match(extractor);
    //if there is no match
    if (!match || match.length < 4) {
      //skip line
      return;
    }
    //extract selector, alias, and style from match
    const [ _, selector, alias, style ] = match;
    //add to definitions
    definitions.push({
      media,
      selector: selector.trim().substring(5),
      style: style.trim()
    });
    //if there is an alias
    if (alias) {
      //also add to definitions
      definitions.push({
        media,
        selector: alias.trim().substring(5),
        style: style.trim()
      });
    }
  });
  //write definitions to global.json
  fs.writeFileSync(output, JSON.stringify(definitions));
}

main().then(console.log).catch(console.error);
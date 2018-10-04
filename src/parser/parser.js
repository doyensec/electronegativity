import { parseModule as esprima_parse } from 'esprima';
import { load as cheerio_load } from 'cheerio';

import { extension } from '../util';
import { sourceTypes, sourceExtensions } from './types';

export class Parser {
  constructor() { }

  parse(filename, content) {
    // https://en.wikipedia.org/wiki/Shebang_(Unix)
    function strip_shebang(content) {
      let i = 0;
      for (; i < content.length; ++i) {
        if (content[i] !== ' ' && content[i] !== '\t' && content[i] !== '\n' && content[i] !== '\r')
          break;
      }
  
      let start = -1;
      let end = -1;
      if (content.length >= 2 + i && content[i] === '#' && content[i + 1] === '!') {
        start = i;
        for (; i < content.length; ++i) {
          if (content[i] === '\n' || content[i] === '\r') {
            end = i;
            break;
          }
        }

        if (start !== -1) {
          if (end === -1) {
            return ''; // shouldn't really happen unless the only line in a file is the shebang
          }

          // replace with spaces to keep offsets intact
          return content.slice(0, start) + ' '.repeat(end - start) + content.slice(end);
        }
      }
      return content;
    }

    const ext = extension(filename);

    const sourceType = sourceExtensions[ext];
    content = content.toString();
    let data = null;
    let error = null;
    try {
      switch (sourceType) {
        case sourceTypes.JAVASCRIPT:
          data = esprima_parse(strip_shebang(content), { loc: true, tolerant: true, jsx: true });
          break;
        case sourceTypes.HTML:
          data = cheerio_load(content, { xmlMode: true, withStartIndices: true });
          break;
        case sourceTypes.JSON:
          data = {json: JSON.parse(content), text: content};
          break;
        default:
          break;
      } 
    } catch (e) {
      error = e;
    }

    return new Array(sourceType, data, content, error);
  }
}

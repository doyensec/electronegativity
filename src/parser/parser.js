import { parseModule as esprima_parse } from 'esprima';
import { load as cheerio_load } from 'cheerio';

import { extension } from '../util';
import { sourceTypes, sourceExtensions } from './types';

export class Parser {
  constructor() { }

  parse(filename, content) {
    const ext = extension(filename);

    const sourceType = sourceExtensions[ext];
    content = content.toString();
    let data = null;
    let error = null;
    try {
      switch (sourceType) {
        case sourceTypes.JAVASCRIPT:
          data = esprima_parse(content, { loc: true, tolerant: true });
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

import { parse as esprima_parse } from 'esprima';
import { load as cheerio_load } from 'cheerio';

import { extension } from '../util';
import { sourceTypes, sourceExtensions } from './types';

export class Parser {
  constructor() { }

  parse(filename, content) {
    const ext = extension(filename);

    const sourceType = sourceExtensions[ext];

    let data = null;
    switch (sourceType) {
      case sourceTypes.JAVASCRIPT:
        data = esprima_parse(content.toString(), { loc: true });
        break;
      case sourceTypes.HTML:
        data = cheerio_load(content, { xmlMode: true, withStartIndices: true });
        break;
      case sourceTypes.JSON:
        data = content;
        break;
      default:
        break;
    }

    return new Array(sourceType, data, content);
  }
}

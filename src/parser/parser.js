import logger from 'winston';

import { parse as esprima_parse } from 'esprima';
import { load as cheerio_load } from 'cheerio';

import { extension } from '../util';
import { sourceTypes, sourceExtensions } from './types';

export class Parser {
  constructor() { }

  // returns map [sourceType, dataStructure]
  parse(filename, content) {
    logger.debug(`Parsing file: ${filename}`);

    const ext = extension(filename);
    logger.debug(`  -> extension is : ${ext}`);
    const sourceType = sourceExtensions[ext];
    logger.debug(`  -> source type is : ${sourceType}`);

    let data = null;
    switch (sourceType) {
      case sourceTypes.JAVASCRIPT:
        logger.debug('... parsing JavaScript');
        // try {
        data = esprima_parse(content.toString(), { loc: true });
        // } catch (error) {
        //   logger.error("Error parsing JS...");
        //   logger.error(content.toString());
        //   return;
        // }
        break;
      case sourceTypes.HTML:
        logger.debug('... parsing HTML');
        data = cheerio_load(content);
        break;
      default:
        logger.error(`No parser for file extension : ${filename}`);
        break;
    }

    return new Array(sourceType, data);
  }
}

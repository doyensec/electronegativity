import logger from 'winston';
import fs from 'fs';
import path from 'path';

import { LoaderFile, LoaderAsar } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension } from './util';

export function run(args) {
  const input = args.input;

  // Load
  const loader = ((extension(input) === 'asar') ? new LoaderAsar() : new LoaderFile());
  logger.info(`Loading file : ${input}`);
  loader.load_file(input);

  // TODO
  // Parse
  const parser = new Parser();
  const finder = new Finder();
  const filenames = [...loader.loaded.keys()];
  for (const file of filenames) {
    logger.info(`Parsing file : ${file}`);
    const [type, data] = parser.parse(file, loader.loaded.get(file));
    logger.info(`Analyzing file : ${file}`);
    const result = finder.find(file, data, type);
    logger.info(`Found ${result.length} issue(s) in file: ${file}`);
    for (const issue of result) {
      const loc = issue.get('loc');
      logger.info(`  Issue : ${issue.get('check').id} - Location : ${loc.line}:${loc.column}`);
    }
  }
}

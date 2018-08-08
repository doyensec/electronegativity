#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import logger from 'winston';

import { file_exists, extension } from './util';
import { sourceExtensions } from './parser/types';


program.arguments('<file>')
  .option('-i, --input <input>', 'folder|asar|js|html')
  .option('-d, --debug', 'Enable asserts and verbose output')
  .parse(process.argv);

function main() {
  const args = {
    input: { input: null },
    options: {
      debug: false,
    },
  };

  args.options.debug = program.debug || false;

  let input;
  try{
    input = path.resolve(program.input);
  }catch(e){
    logger.error(e);
  }
  
  if (!file_exists(input)) {
    console.error('Input file does not exist!');
    return;
  } if (!['asar', ...Object.keys(sourceExtensions)].includes(extension(input))) {
    console.error('Unknown input file format!');
    return;
  }
  args.input = path.resolve(input);


  if (args.options.debug) {
    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, { colorize: false, level: 'silly' });
  }

  const runner = require('./runner');
  runner.run(args);
}

main();

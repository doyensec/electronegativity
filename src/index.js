import colors from 'colors';
import program from 'commander';
import path from 'path';
import util from 'util';
import logger from 'winston';

import { file_exists, extension } from './util'
import { sourceExtensions } from './parser/types';

logger.addColors({
  debug : 'green',
  info : 'cyan',
  silly : 'magenta',
  warn : 'yellow',
  error : 'red'
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize : true});

function error_text(txt) { return colors.red(txt); }

program.arguments('<file>')
    .option('-i, --input <input>', 'folder|asar|js|html')
    .option('--debug', 'Enable asserts and verbose output');

function main() {
  const args = {
    input : {input : null},
    options : {
      debug : false,
    }
  };

  program.parse(process.argv);

  args.options.debug = program.debug || false;

  let input = path.resolve(program.input)
  if (!file_exists(input)) {
    console.error('Input file does not exist!');
    return;
  } else if (!['asar', ...Object.keys(sourceExtensions)].includes(extension(input))) {
    console.error('Unknown input file format!');
    return;
  } else {
    args.input = path.resolve(input);
  }

  if (args.options.debug) {
    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, {colorize : false, level : 'silly'});
  }

  var runner = require('./runner');
  runner.run(args);
}

main();

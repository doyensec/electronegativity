import colors from 'colors';
import program from 'commander';
import path from 'path';
import util from 'util';
import logger from 'winston';

import { file_exists } from './util'

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
  if (file_exists(input)) {
    args.input.file = input;
  } else {
    console.error('The --input parameter must be a valid file');
    program.outputHelp(error_text);
    return;
  }

  if (args.options.debug) {
    logger.remove(logger.transports.Console);
    logger.add(logger.transports.Console, {colorize : false, level : 'silly'});
  }

  var runner = require('./runner');
  runner.run(args);
}

main();

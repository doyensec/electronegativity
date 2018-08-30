import fs from 'fs';
import path from 'path';
import logger from 'winston';

logger.addColors({
  debug : 'green',
  info : 'cyan',
  silly : 'magenta',
  warn : 'yellow',
  error : 'red'
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize : true, level : 'silly'});

let chai = require('chai');
let should = chai.should();

import { LoaderFile } from '../src/loader';
import { Parser } from '../src/parser';
import { Finder } from '../src/finder';

let check_tests = "test/checks";

describe('Finder', () => {
  let finder = new Finder();

  // Load all test files
  let loader = new LoaderFile();
  let list = fs.readdirSync(check_tests);
  for (let file of list) {
      loader.load(path.join(check_tests, file));
  }
  let filenames = [...loader.loaded.keys()];

  let testcases = new Map();

  // Parse all files and ...
  let parser = new Parser();
  for (let file of filenames) {
    const [type, data, content] = parser.parse(file, loader.loaded.get(file));
    let split = path.basename(file.substr(0, file.lastIndexOf('.'))).split('_');
    let num_issues = +split.pop();
    split.pop()
    let check = split.join("_").toUpperCase();

    if (!testcases.has(check)) {
      testcases.set(check, []);
    }
    testcases.get(check).push([file, type, data, num_issues, content]);
  }

  // For each ...
  for (let check of [...testcases.keys()]) {
    for (let [file, type, data, num_issues, content] of testcases.get(check)) {
      let result = finder.find(file, data, type, content, [ check ]);
      it('Finds ' + num_issues + ' issue(s) in ' + path.basename(file), () => {
        result.length.should.equal(num_issues);
      });
    }
  }

});

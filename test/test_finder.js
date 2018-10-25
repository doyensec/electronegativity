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

  // Parse all files and ...
  let parsers = [new Parser(false, true), new Parser(true, true), new Parser(true, false), new Parser(false, false)];
  for (let parser of parsers) {
    let testcases = new Map();
    
    for (let file of filenames) {
      const [type, data, content] = parser.parse(file, loader.loaded.get(file));
      let split = path.basename(file.substr(0, file.lastIndexOf('.'))).split('_');
      let num_issues = +split.pop();
      split.pop();
      let check = split.join("_").toUpperCase();
  
      if (!testcases.has(check)) {
        testcases.set(check, []);
      }
      testcases.get(check).push([file, type, data, num_issues, content]);
    }
  
    // For each ...
    for (let check of [...testcases.keys()]) {
      for (let [file, type, data, num_issues, content] of testcases.get(check)) {
        let result = finder.find(file, data, type, content);
        it('Finds ' + num_issues + ' issue(s) in ' + path.basename(file), () => {
          result.filter(r => {return r.check.id === check}).length.should.equal(num_issues);
        });
      }
    }
  }
});

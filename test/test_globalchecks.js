import fs from 'fs';
import path from 'path';
import logger from 'winston';
import { LoaderDirectory } from '../src/loader';
import { Parser } from '../src/parser';
import { Finder } from '../src/finder';
import { GlobalChecks } from '../src/finder';

let chai = require('chai');
let should = chai.should();

logger.addColors({
  debug : 'green',
  info : 'cyan',
  silly : 'magenta',
  warn : 'yellow',
  error : 'red'
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize : true, level : 'silly'});

let globalcheck_tests = "test/checks/GlobalChecks";

describe('GlobalChecks', async () => {
  const electronVersions = '4..8';
  const globalChecker = new GlobalChecks(null, electronVersions);
  // Load all test file
  let loader = new LoaderDirectory();
  let directories = fs.readdirSync(globalcheck_tests);
  const parser = new Parser(false, true);

  for (let dir of directories) {
    // test the globalCheck
    it('Testing ' + dir, async () => {
      await loader.load(path.join(globalcheck_tests, dir));

      let filenames = [...loader.list_files];

      //gets the check name and issues count
      let split = dir.split('_');
      let num_issues = +split.pop();
      split.pop();
      let check = split.join("_").toUpperCase();

      var issues = [];

      // just take the check of interest
      var testedCheck = globalChecker._constructed_checks.findIndex(gc => gc.id === check);
      var globalCheck = globalChecker._constructed_checks[testedCheck];

      // loads the dependencies for the current globalCheck
      let finder = await new Finder(globalCheck.depends.map(check => check.toLowerCase()), electronVersions);
      // run the checks required by the globalCheck in order to work
      for (let file of filenames) {
            const [type, data, content, warnings] = parser.parse(file, loader.load_buffer(file));
            let findings = await finder.find(file, data, type, content);
            if (findings.length > 0) issues = issues.concat(findings);
      }
      // test the globalCheck
      let result = await globalCheck.perform(issues);
      result.filter(r => {return r.id === globalCheck.id;}).length.should.equal(num_issues);
      await loader.stash();
    }).timeout(8000);
  }
});
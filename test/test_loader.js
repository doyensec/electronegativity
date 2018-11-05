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
chai.should();

import { LoaderAsar, LoaderFile } from '../src/loader';

let test_files = new Map()
                      .set('asar', 'test/file_formats/electron.asar')
                      .set('html', 'test/file_formats/test.html')
                      .set('js', 'test/file_formats/test.js');

describe('Loader classes', () => {
  describe('LoaderASAR', () => {
    let loader = null;

    beforeEach(() => {
      loader = new LoaderAsar();
    });

    it('fails if archive does not exist', () => {
      (() => {
        loader.load('FOO');
      }).should.throw();
    });

    it('extracts file from ASAR', () => {
      loader.load(test_files.get('asar'));
      loader.list_files.size.should.equal(60);
    });
  }),

  describe('LoaderFile', () => {
    let loader = null;

    beforeEach(() => {
      loader = new LoaderFile();
    });

    it('fails if archive does not exist', () => {
      (() => {
        loader.load('FOO');
      }).should.throw();
    });

    it('extracts file from ASAR', () => {
      loader.load(test_files.get('js'));
      loader.list_files.size.should.equal(1);
    });
  });
});

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

let test_files = new Map()
                      .set('html', 'test/file_formats/test.html')
                      .set('js', 'test/file_formats/test.js');

describe('Parser', () => {
  let parser = new Parser();

  describe('Parse JavaScript', () => {
    let loader = new LoaderFile();
    loader.load(test_files.get('js'));
    let filename = [...loader.loaded.keys()][0];
    let content = loader.loaded.get(filename);

    beforeEach(() => { });

    let output = null;

    it('does not Throw', () => {
      (() => {
        output = parser.parse(filename, content);
      }).should.not.throw();
    });

    it('returns an Array', () => {
      output.should.be.a('Array');
    });

    it('returns an Array of length 2', () => {
      output.length.should.equal(2);
    });

    it('parsed source type should not be null', () => {
      should.exist(output[0]);
    });

    it('parsed data should not be null', () => {
      should.exist(output[1]);
    });

    it('parsed data should be an AST', () => {
      output[1].type.should.equal("Program");
    });
  });

  describe('Parse HTML', () => {
    let loader = new LoaderFile();
    loader.load(test_files.get('html'));
    let filename = [...loader.loaded.keys()][0];
    let content = loader.loaded.get(filename);

    beforeEach(() => { });

    let output = null;

    it('does not Throw', () => {
      (() => {
        output = parser.parse(filename, content);
      }).should.not.throw();
    });

    it('returns an Array', () => {
      output.should.be.a('Array');
    });

    it('returns an Array of length 2', () => {
      output.length.should.equal(2);
    });

    it('parsed source type should not be null', () => {
      should.exist(output[0]);
    });

    it('parsed data should not be null', () => {
      should.exist(output[1]);
    });

    it('parsed data should be a DOM', () => {
      output[1].html().should.include("<!DOCTYPE html>");
    });
  });

});

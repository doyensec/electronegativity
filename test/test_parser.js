import logger from 'winston';

import { Finder } from '../src/finder';

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
  .set('ts', 'test/file_formats/test.ts')
  .set('js', 'test/file_formats/test.js')
  .set('esprima', 'test/file_formats/esprima.js')
  .set('babel', 'test/file_formats/babel.js');

function parseFile(file, parser, finder) {
  let loader = new LoaderFile();
  loader.load(test_files.get(file));
  let filename = [...loader.list_files][0];
  let content = loader.load_buffer(filename);

  let output = null;

  it('does not Throw', () => {
    (async () => {
      output = parser.parse(filename, content);
      await finder.find(filename, output[1], output[0], content);
    }).should.not.throw();
  });

  it('returns an Array', () => {
    output.should.be.a('Array');
  });

  it('returns an Array of length 4', () => {
    output.length.should.equal(4);
  });

  it('parsed source type should not be null', () => {
    should.exist(output[0]);
  });

  it('parsed data should not be null', () => {
    should.exist(output[1]);
  });
}

describe('Parser', () => {
  let parser = new Parser(false, true);
  let finder = new Finder();

  describe('Parse JavaScript', () => {
    parseFile('js', parser, finder);
  });

  describe('Parse JS babel cannot', () => {
    parseFile('esprima', parser, finder);
  });

  describe('Parse JS esprima cannot', () => {
    parseFile('babel', parser, finder);
  });

  describe('Parse TypeScript', () => {
    parseFile('ts', parser, finder);
  });

  describe('Parse HTML', () => {
    let loader = new LoaderFile();
    loader.load(test_files.get('html'));
    let filename = [...loader.list_files][0];
    let content = loader.load_buffer(filename);

    let output = null;

    it('does not Throw', () => {
      (() => {
        output = parser.parse(filename, content);
      }).should.not.throw();
    });

    it('returns an Array', () => {
      output.should.be.a('Array');
    });

    it('returns an Array of length 4', () => {
      output.length.should.equal(4);
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

#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import chalk from 'chalk'; 

import run from './runner.js'
import { file_exists, extension } from './util';
import { sourceExtensions } from './parser/types';


program
  .version('1.0')
  .option('-f, --file <file>', 'Input file')
  .parse(process.argv);

const input = program.file;

if(!input){
  program.outputHelp();
  process.exit(1);
}
if (!file_exists(input)) {
  console.log(chalk.red('Input file does not exist!'));
  process.exit(1);
} 
if (!['asar', ...Object.keys(sourceExtensions)].includes(extension(input))) {
  console.log(chalk.red('Unknown input file format!'));
  process.exit(1);
}

const file = path.resolve(input);

run(file);

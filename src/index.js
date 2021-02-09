#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import chalk from 'chalk';
import run from './runner.js';

const VER = require('../package.json').version;
const falsyStrings = ["false", "FALSE", "off", "0", "no", "disable", "disabled"];

program
  .version(VER)
  .description('Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications.')
  .option('-i, --input <path>', 'input [directory | .js | .html | .asar]')
  .option('-l, --checks <checkNames>', 'only run the specified checks list, passed in csv format')
  .option('-x, --exclude-checks <excludedCheckNames>', 'skip the specified checks list, passed in csv format')
  .option('-s, --severity <severitySet>', 'only return findings with the specified level of severity or above')
  .option('-c, --confidence <confidenceSet>', 'only return findings with the specified level of confidence or above')
  .option('-o, --output <filename[.csv | .sarif]>', 'save the results to a file in csv or sarif format')
  .option('-r, --relative', 'show relative path for files')
  .option('-v, --verbose <bool>', 'show the description for the findings, defaults to true')
  .option('-u, --upgrade <current version..target version>', 'run Electron upgrade checks, eg -u 7..8')
  .option('-e, --electron-version <version>', 'assume the set Electron version, overriding the detected one, eg -e 7.0.0 to treat as using Electron 7')
  .option('-p, --parser-plugins <plugins>', 'specify additional parser plugins to use separated by commas, e.g. -p optionalChaining')
  .parse(process.argv);

const forCli = !program.output;

if (forCli) {
  console.log(`
▄▄▄ ▄▄▌ ▄▄▄ .▄▄·▄▄▄▄▄▄▄
▀▄.▀██• ▀▄.▀▐█ ▌•██ ▀▄ █▪
▐▀▀▪██▪ ▐▀▀▪██ ▄▄▐█.▐▀▀▄ ▄█▀▄
▐█▄▄▐█▌▐▐█▄▄▐███▌▐█▌▐█•█▐█▌.▐▌
  ▀▀▀.▀▀▀ ▀▀▀·▀▀▀ ▀▀▀.▀  ▀▀█▄▀▪
  ▐ ▄▄▄▄ .▄▄ • ▄▄▄▄▄▄▄▪  ▌ ▐▪▄▄▄▄▄▄· ▄▌
•█▌▐▀▄.▀▐█ ▀ ▐█ ▀•██ ██▪█·██•██ ▐█▪██▌
▐█▐▐▐▀▀▪▄█ ▀█▄█▀▀█▐█.▐█▐█▐█▐█▐█.▐█▌▐█▪
██▐█▐█▄▄▐█▄▪▐▐█ ▪▐▐█▌▐█▌███▐█▐█▌·▐█▀·.
▀▀ █▪▀▀▀·▀▀▀▀ ▀  ▀▀▀▀▀▀. ▀ ▀▀▀▀▀  ▀ •
      v`+VER+`  https://doyensec.com/
  `);
  console.log("Scan Status:");
}

if(!program.input){
  program.outputHelp();
  process.exit(1);
}

if(program.output){
  program.fileFormat = program.output.split('.').pop();
  if(program.fileFormat !== 'csv' && program.fileFormat !== 'sarif'){
    console.error(chalk.red('Please specify file format extension.'));
    program.outputHelp();
    process.exit(1);
  }
}

if (typeof program.checks !== 'undefined' && program.checks){
  program.checks = program.checks.split(",").map(check => check.trim().toLowerCase());
} else program.checks = [];

if (typeof program.excludeChecks !== 'undefined' && program.excludeChecks){
  program.excludeChecks = program.excludeChecks.split(",").map(check => check.trim().toLowerCase());
} else program.excludeChecks = [];

if (typeof program.verbose !== 'undefined' && (falsyStrings.includes(program.verbose)))
  program.verbose = false;
else
  program.verbose = true;

if (typeof program.parserPlugins !== 'undefined' && program.parserPlugins)
  program.parserPlugins = program.parserPlugins.split(",").map(p => p.trim());
else
  program.parserPlugins = [];


const input = path.resolve(program.input);

run({
  input,
  output: program.output,
  isSarif: program.fileFormat === 'sarif',
  customScan: program.checks,
  excludeFromScan: program.excludeChecks,
  severitySet: program.severity,
  confidenceSet: program.confidence,
  isRelative: program.relative,
  isVerbose: program.verbose,
  electronUpgrade: program.upgrade,
  electronVersionOverride: program.electronVersion,
  parserPlugins: program.parserPlugins
}, forCli).catch(error => {
  console.error(chalk.red(error.stack));
  process.exit(1);
});

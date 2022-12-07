#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import chalk from 'chalk';
import _i18n from './locales/i18n.js';
import run from './runner.js';

async function main() {

  var twirlTimer = (function() {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function() {
      process.stdout.write("\r" + P[x++] + " Starting up Electronegativity...");
      x &= 3;
    }, 250);
  })();

  await _i18n(); // wait for the _i18n function to complete

  const VER = require('../package.json').version;
  const falsyStrings = ["false", "FALSE", "off", "0", "no", "disable", "disabled"];

  program
    .version(VER)
      .description(__('electronegativityDescription'))
      .option(__('inputOption'), __('inputOptionDescription'))
      .option(__('checksOption'), __('checksOptionDescription'))
      .option(__('excludeChecksOption'), __('excludeChecksOptionDescription'))
      .option(__('severityOption'), __('severityOptionDescription'))
      .option(__('confidenceOption'), __('confidenceOptionDescription'))
      .option(__('outputOption'), __('outputOptionDescription'))
      .option(__('relativeOption'), __('relativeOptionDescription'))
      .option(__('verboseOption'), __('verboseOptionDescription'))
      .option(__('upgradeOption'), __('upgradeOptionDescription'))
      .option(__('electronVersionOption'), __('electronVersionOptionDescription'))
      .option(__('parserPluginsOption'), __('parserPluginsOptionDescription'))
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
    console.log('\x1b[4m\x1b[36m%s\x1b[0m',__('tryElectroNg'));
    console.log("\x1b[4m\x1b[33m%s\x1b[0m", __('contactUs'));
    console.log("\x1b[4m\x1b[33m%s\x1b[0m", __('foundBug'));
    console.log(__('startScan'));
  }

  if(!program.input){
    program.outputHelp();
    process.exit(1);
  }

  if(program.output){
    program.fileFormat = program.output.split('.').pop();
    if(program.fileFormat !== 'csv' && program.fileFormat !== 'sarif'){
      console.error(chalk.red(__('fileFormatError')));
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
}

main();

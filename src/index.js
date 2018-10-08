#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import chalk from 'chalk';
import run from './runner.js'

console.log(`
███████╗██╗     ███████╗ ██████╗████████╗██████╗  ██████╗ ███╗   ██╗███████╗ ██████╗  █████╗ ████████╗██╗██╗   ██╗██╗████████╗██╗   ██╗
██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝ ██╔══██╗╚══██╔══╝██║██║   ██║██║╚══██╔══╝╚██╗ ██╔╝
█████╗  ██║     █████╗  ██║        ██║   ██████╔╝██║   ██║██╔██╗ ██║█████╗  ██║  ███╗███████║   ██║   ██║██║   ██║██║   ██║    ╚████╔╝ 
██╔══╝  ██║     ██╔══╝  ██║        ██║   ██╔══██╗██║   ██║██║╚██╗██║██╔══╝  ██║   ██║██╔══██║   ██║   ██║╚██╗ ██╔╝██║   ██║     ╚██╔╝  
███████╗███████╗███████╗╚██████╗   ██║   ██║  ██║╚██████╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║   ██║   ██║ ╚████╔╝ ██║   ██║      ██║   
╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝  ╚═╝   ╚═╝      ╚═╝   
                                                      By @Doyensec                     

`)

program
  .version('1.0.6')
  .description('Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications.')
  .option('-i, --input <path>', 'input [directory | .js | .html | .asar]')
  .option('-o, --output <filename[.csv | .sarif]>', 'save the results to a file in csv or sarif format')
  .parse(process.argv);

if(!program.input){
  program.outputHelp();
  process.exit(1);
}

if(program.output){
  program.fileFormat = program.output.split('.').pop();
  if(program.fileFormat !== 'csv' && program.fileFormat !== 'sarif'){
    console.log(chalk.red('Please specify file format extension.'));
    program.outputHelp();
    process.exit(1);
  }
}

const input = path.resolve(program.input);

run(input, program.output, program.fileFormat === 'sarif');

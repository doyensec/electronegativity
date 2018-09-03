#!/usr/bin/env node

import program from 'commander';
import path from 'path';

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
  .option('-o, --output <filename>', 'save the results in csv format to a file')
  .parse(process.argv);

if(!program.input){
  program.outputHelp();
  process.exit(1);
}

const input = path.resolve(program.input);

run(input, program.output);

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
  .version('1.0')
  .description('Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications.')
  .option('-i, --input <input>', 'input [directory | .js | .html | .asar]')
  .parse(process.argv);

if(!program.input){
  program.outputHelp();
  process.exit(1);
}

const input = path.resolve(program.input);

run(input);

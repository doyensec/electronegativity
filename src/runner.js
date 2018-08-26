import cliProgress from 'cli-progress';
import Table from 'cli-table2';
import chalk from 'chalk';

import { LoaderFile, LoaderAsar, LoaderDirectory } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension, input_exists, is_directory, writeOutput } from './util';

export default async function run(input, output) {
  if (!input_exists(input)) {
    console.log(chalk.red('Input does not exist!'));
    process.exit(1);
  }

  // Load
  let loader;

  if(is_directory(input)){
    loader = new LoaderDirectory();
  }else{
    loader = ((extension(input) === 'asar') ? new LoaderAsar() : new LoaderFile());
  }

  await loader.load(input);

  // Parse
  const parser = new Parser();
  const finder = new Finder();
  const filenames = [...loader.loaded.keys()];

  const progress = new cliProgress.Bar({format: '{bar} {percentage}% | {value}/{total}'}, cliProgress.Presets.shades_grey);
  progress.start(filenames.length, 0);

  let table = new Table({
    head: ['Issue ID', 'File', 'Location', 'URL'],
    wordWrap: true
  });

  let issues = []; 

  for (const file of filenames) {
    progress.increment();

    const [type, data] = parser.parse(file, loader.loaded.get(file));
    const result = finder.find(file, data, type);
    
    if(output) writeOutput(output, result);

    for (const issue of result) {
      issues.push([
                    issue.check.id, 
                    issue.file, 
                    `${issue.location.line}:${issue.location.column}`, 
                    `https://github.com/doyensec/electronegativity/wiki/${issue.check.id}`
                  ])
    }
  }
  progress.stop();

  table.push(...issues);
  console.log(table.toString());
}

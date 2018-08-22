import cliProgress from 'cli-progress';
import Table from 'cli-table';
import { statSync } from 'fs';
import chalk from 'chalk'; 

import { LoaderFile, LoaderAsar, LoaderDirectory } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension, input_exists, is_directory } from './util';

export default async function run(input) {
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

  var table = new Table({
    head: ['File', 'Location', 'Issue', 'Description', 'URL']
  });

  // console.log("entering")
  for (const file of filenames) {
    progress.increment();

    const [type, data] = parser.parse(file, loader.loaded.get(file));
    const result = finder.find(file, data, type);
    
    for (const issue of result) {
      table.push( [issue.file, `${issue.location.line}:${issue.location.column}`, issue.check._id, issue.check._description, 'url'] )
    }
  }
  
  progress.stop()
  console.log(table.toString())
}

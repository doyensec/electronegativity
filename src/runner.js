import logger from 'winston';
import cliProgress from 'cli-progress';
import Table from 'cli-table';

import { LoaderFile, LoaderAsar } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension } from './util';

export default function run(file) {
  // Load
  const loader = ((extension(file) === 'asar') ? new LoaderAsar() : new LoaderFile());
  //logger.info(`Loading file : ${input}`);
  loader.load_file(file);

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

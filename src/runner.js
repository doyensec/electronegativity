import cliProgress from 'cli-progress';
import Table from 'cli-table2';
import chalk from 'chalk';

import { LoaderFile, LoaderAsar, LoaderDirectory } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension, input_exists, is_directory, writeCsvHeader, writeIssues } from './util';
import { isNull } from 'util';

export default async function run(input, output, isSarif) {
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
  let errors = [];

  for (const file of filenames) {
    progress.increment();

    const [type, data, content, error] = parser.parse(file, loader.loaded.get(file));

    if (!isNull(error)) {
      errors.push({file: file, message: error.message, tolerable: false});
      continue; // 'data' is undefined - no need to collect data.errors
    }

    if (data.errors !== undefined) {
      for (const warning of data.errors) {
        errors.push({file: file, message: warning.message, tolerable: true});
      }
    }

    const result = finder.find(file, data, type, content);
    issues.push(...result);
  }

  if (output)
    writeIssues(output, issues, isSarif);

  progress.stop();

  for (const error of errors) {
    if (error.tolerable)
      console.log(chalk.yellow(`Tolerable error parsing ${error.file} - ${error.message}`));
    else
      console.log(chalk.red(`Error parsing ${error.file} - ${error.message}`));
  }

  let rows = [];
  for (const issue of issues) {
    rows.push([
      `${issue.check.id} ${issue.check.manualReview !== undefined && issue.check.manualReview ? chalk.bgRed(`Manual Review Required`) : ``}`,
      issue.file,
      `${issue.location.line}:${issue.location.column}`,
      `https://github.com/doyensec/electronegativity/wiki/${issue.check.id}`
    ]);
  }

  table.push(...rows);
  console.log(table.toString());
}

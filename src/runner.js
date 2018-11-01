import cliProgress from 'cli-progress';
import Table from 'cli-table2';
import chalk from 'chalk';

import { LoaderFile, LoaderAsar, LoaderDirectory } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { extension, input_exists, is_directory, writeIssues } from './util';

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
    loader = (extension(input) === 'asar') ? new LoaderAsar() : new LoaderFile();
  }

  await loader.load(input);

  // Parse
  const parser = new Parser(false, true);
  const finder = new Finder();
  const filenames = [...loader.loaded.keys()];
  let issues = [];
  let errors = [];
  let table = new Table({
    head: ['Issue ID', 'File', 'Location', 'URL'],
    wordWrap: true
  });

  const progress = new cliProgress.Bar({format: '{bar} {percentage}% | {value}/{total}'}, cliProgress.Presets.shades_grey);
  let oldLog = console.log;
  let consoleArguments = [];
  console.log = function () {
    consoleArguments.push(arguments);
  };

  try {
    progress.start(filenames.length, 0);

    for (const file of filenames) {
      progress.increment();

      try {
        const [type, data, content, warnings] = parser.parse(file, loader.loaded.get(file));
        if (data === null)
          continue;

        if (warnings !== undefined) {
          for (const warning of warnings) {
            errors.push({ file: file, message: warning.message, tolerable: true });
          }
        }

        const result = await finder.find(file, data, type, content);
        issues.push(...result);
      } catch (error) {
        errors.push({ file: file, message: error.message, tolerable: false });
      }
    }

    if (output)
      writeIssues(output, issues, isSarif);

    progress.stop();
  }
  finally {
    console.log = oldLog;
    for (let i = 0; i < consoleArguments.length; i++)
      console.log.apply(this, consoleArguments[i]);
  }

  for (const error of errors) {
    if (error.tolerable)
      console.log(chalk.yellow(`Tolerable error parsing ${error.file} - ${error.message}`));
    else
      console.log(chalk.red(`Error parsing ${error.file} - ${error.message}`));
  }

  let rows = [];
  for (const issue of issues) {
    rows.push([
      `${issue.id} ${issue.manualReview && issue.manualReview ? chalk.bgRed(`Manual Review Required`) : ``}`,
      issue.file,
      `${issue.location.line}:${issue.location.column}`,
      `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
    ]);
  }

  table.push(...rows);
  console.log(table.toString());
}

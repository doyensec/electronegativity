import cliProgress from 'cli-progress';
import Table from 'cli-table2';
import chalk from 'chalk';

import { LoaderFile, LoaderAsar, LoaderDirectory } from './loader';
import { Parser } from './parser';
import { Finder } from './finder';
import { GlobalChecks, severity, confidence } from './finder';
import { extension, input_exists, is_directory, writeIssues } from './util';

export default async function run(input, output, isSarif, customScan, severitySet, confidenceSet) {
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

  if (severitySet) {
    if (!severity.hasOwnProperty(severitySet.toUpperCase())) {
      console.log(chalk.red('This severity level does not exist!'));
      process.exit(1);
    } else severitySet = severity[severitySet.toUpperCase()];
  } else severitySet = severity["INFORMATIONAL"]; // default to lowest

  if (confidenceSet) {
    if (!confidence.hasOwnProperty(confidenceSet.toUpperCase())) {
      console.log(chalk.red('This confidence level does not exist!'));
      process.exit(1);
    } else confidenceSet = confidence[confidenceSet.toUpperCase()];
  } else confidenceSet = confidence["TENTATIVE"]; // default to lowest

  // Parser
  const parser = new Parser(false, true);
  const globalChecker = new GlobalChecks(customScan);
  if (customScan.length > 0) customScan = customScan.filter(r => !r.includes('globalcheck')).concat(globalChecker.dependencies);
  const finder = await new Finder(customScan);
  const filenames = [...loader.list_files];
  let issues = [];
  let errors = [];
  let table = new Table({
    head: ['Check ID', 'Affected File', 'Location', 'Issue Description'],
    wordWrap: true
  });

  console.log(chalk.green(`${globalChecker._enabled_checks.length+finder._enabled_checks.length} check(s) successfully loaded: ${globalChecker._enabled_checks.length} global, ${finder._enabled_checks.length} atomic`));

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
        const [type, data, content, warnings] = parser.parse(file, loader.load_buffer(file));
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

  // Second pass of checks (in "GlobalChecks")
  // Now that we have all the "naive" findings we may analyze them further to sort out false negatives
  // and false positives before presenting them in the final report (e.g. CSP)
  issues = await globalChecker.getResults(issues);

  let rows = [];
  for (const issue of issues) {
    if (issue.severity.value >= severitySet.value && issue.confidence.value >= confidenceSet.value)
      rows.push([
        `${issue.id}${issue.manualReview ? chalk.bgRed(`\n*Review Required*`) : ``}\n${issue.severity.format()} | ${issue.confidence.format()}`,
        issue.file,
        `${issue.location.line}:${issue.location.column}`,
        `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
      ]);
  }

  if (output)
    writeIssues(output, issues, isSarif);

  if (rows.length > 0) {
    table.push(...rows);
    console.log(table.toString());
  }
  else
    console.log(chalk.green(`\nNo issues were found.`));
}

import fs from 'fs';
import dir from 'node-dir';
import os from 'os';

export function is_directory(input){
  return fs.statSync(input).isDirectory();
}

export function input_exists(input) {
  try {
    return fs.lstatSync(input);
  } catch (err) {
    return false;
  }
}

export function read_file(file) {
  return fs.readFileSync(file, 'utf8');
}

export function extension(file) {
  return file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
}

export function list_files(input){
  return dir.promiseFiles(input)
    .then(files => {
      files = files.filter(file => {
        return file.indexOf('node_modules') === -1 && (['js', 'jsx', 'ts', 'tsx', 'html', 'htm'].includes(extension(file)) || file.toLowerCase().indexOf('package.json') > -1);
      });
      return files;
    })
    .catch(console.error);
}

export function writeIssues(filename, result, isSarif){
  let issues = '';
  let fileFlag = 'w';

  if (isSarif) {
    issues =
      {
        $schema: "http://json.schemastore.org/sarif-2.0.0",
        version: "2.0.0",
        runs: [
          {
            tool: {
              name: "Electronegativity",
              fullName: "Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications"
            },
            results: [],
            resources: {
              rules: {
              }
            }
          }
        ]
      };

    result.forEach(issue => {
      if (issues.runs[0].resources.rules[issue.id] === undefined) {
        issues.runs[0].resources.rules[issue.id] = {
          id: issue.id,
          name: {
            text: issue.description
          },
          fullDescription: {
            text: issue.description
          },
          configuration: {
            defaultLevel: `${issue.manualReview ? 'warning' : 'error'}`
          },
          helpUri: `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
        };
      }
      issues.runs[0].results.push({
        ruleId: issue.id,
        message: {
          text: issue.description
        },
        locations: [
          {
            physicalLocation: {
              fileLocation: {
                uri: issue.file
              },
              region: {
                startLine: issue.location.line,
                startColumn: issue.location.column,
                charLength: issue.sample.length
              }
            }
          }
        ]
      });
    });

    issues = JSON.stringify(issues, null, 2);
  }
  else{
    writeCsvHeader(filename);
    fileFlag = 'a';
    result.forEach(issue => {
      issues += [
        issue.id,
        escapeCsv(issue.severity.name),
        escapeCsv(issue.confidence.name),
        escapeCsv(issue.file),
        escapeCsv(`${issue.location.line}:${issue.location.column}`),
        escapeCsv(issue.sample),
        escapeCsv(issue.description),
        `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
      ].toString();
      issues += os.EOL;
    });
  }

  fs.writeFile(filename, issues, { flag: fileFlag }, (err) => {
    if(err) throw err;
  });
}

function escapeCsv(val) {
  return val != null ? '"' + val.replace(/"/g, '""') + '"' : "N/A";
}

export function writeCsvHeader(filename){
  let header = `issue, severity, confidence, filename, location, sample, description, url${os.EOL}`;

  fs.writeFile(filename, header, (err) => {
    if(err) throw err;
  });
}
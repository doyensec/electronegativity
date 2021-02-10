import fs from 'fs';
import dir from 'node-dir';
import os from 'os';
import path from 'path';
const VER = require('../../package.json').version;

export function is_directory(input){
  return fs.statSync(input).isDirectory();
}

export function getRelativePath(targetFolder, filePath) {
  if (filePath === "N/A")
    return filePath;
  if (is_directory(targetFolder))
    return path.relative(targetFolder, filePath);
  else //if (extension(targetFolder) === 'asar')
    return path.relative(path.dirname(targetFolder), filePath);
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
        return file.indexOf('node_modules') === -1 && (['js', 'jsx', 'ts', 'tsx', 'html', 'htm'].includes(extension(file)) || file.toLowerCase().indexOf('package.json') > -1 || file.toLowerCase().indexOf('package-lock.json') > -1 || file.toLowerCase().indexOf('yarn.lock') > -1);
      });
      return files;
    })
    .catch(console.error);
}

export function writeIssues(root, isRelative, filename, result, isSarif){
  let output = '';
  let fileFlag = 'w';

  if (isSarif) {
    let issues =
    {
      $schema: "http://json.schemastore.org/sarif-2.1.0",
      version: "2.1.0",
      runs: [
        {
          tool: {
            driver: {
              version: `${VER}`,
              informationUri: "https://github.com/doyensec/electronegativity",
              name: "Electronegativity",
              fullName: "Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications",
              rules: []
            }
          },
          results: []
        }
      ]
    };

    if (isRelative) {
      issues.runs[0].invocations = [
        {
          workingDirectory: {
            uri: `file:///${root}`
          },
          executionSuccessful: true
        },
      ];
    }

    result.forEach(issue => {
      if (issues.runs[0].tool.driver.rules[issue.id] === undefined) {
        issues.runs[0].tool.driver.rules.push({
          id: issue.id,
          fullDescription: {
            text: issue.description
          },
          properties: {
            category: "Security"
          },
          helpUri: `https://github.com/doyensec/electronegativity/wiki/${issue.id}`,
          help: {
            text: `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
          }
        });
        issues.runs[0].tool.driver.rules[issue.id] = true;
      }

      let result = {
        ruleId: issue.id,
        level: `${issue.manualReview ? 'note' : 'warning'}`,
        message: {
          text: issue.description
        }
      };

      result.locations = [
        {
          physicalLocation: {
            artifactLocation: {
              uri: issue.file !== "N/A" ? issue.file : "file:///"
            },
            region: {
              startLine: issue.location && issue.location.line !== undefined ? (issue.location.line === 0 ? 1 : issue.location.line) : 1, // This is odd, VS and VS Code highlight the line correctly, but min value is 1
              startColumn: issue.location && issue.location.column !== undefined ? issue.location.column + 1 : 1, // sarif columns start from 1
              charLength: issue.sample ? issue.sample.length : 0
            }
          }
        }
      ];

      issues.runs[0].results.push(result);
    });

    output = JSON.stringify(issues, null, 2);
  }
  else{
    writeCsvHeader(filename);
    fileFlag = 'a';
    result.forEach(issue => {
      output += [
        issue.id,
        escapeCsv(issue.severity.name),
        escapeCsv(issue.confidence.name),
        escapeCsv(issue.file),
        escapeCsv(`${issue.location.line}:${issue.location.column}`),
        escapeCsv(issue.sample),
        escapeCsv(issue.description),
        `https://github.com/doyensec/electronegativity/wiki/${issue.id}`
      ].toString();
      output += os.EOL;
    });
  }

  fs.writeFile(filename, output, { flag: fileFlag }, (err) => {
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

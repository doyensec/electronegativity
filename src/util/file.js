import fs from 'fs';
import dir from 'node-dir';

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
  return file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function list_files(input){
  return dir.promiseFiles(input)
    .then(files => {
      files = files.filter(file => {
        return file.indexOf('node_modules') === -1 && (['js', 'ts', 'tsx', 'html'].includes(extension(file)) || file.indexOf('package.json') > -1);
      });
      return files;
    })
    .catch(console.error)
}

export function writeIssues(filename, result, isSarif){
  let issues = '';

  if (isSarif){
    issues =
      {
        $schema: "http://json.schemastore.org/sarif-2.0.0",
        version: "2.0.0",
        runs: [
          {
            tool: {
              name: "Electronegativity",
              fullName: "Electronegativity is a tool to identify misconfigurations and security anti-patterns in Electron applications",
              version: "1.0.6"
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
      if (issues.runs[0].resources.rules[issue.check.id] === undefined) {
        issues.runs[0].resources.rules[issue.check.id] = {
          id: issue.check.id,
          name: {
            text: issue.check.description
          },
          fullDescription: {
            text: issue.check.description
          },
          configuration: {
            defaultLevel: `${issue.check.manualReview ? 'warning' : 'error'}`
          },
          helpUri: `https://github.com/doyensec/electronegativity/wiki/${issue.check.id}`
        };
      }
      issues.runs[0].results.push({
        ruleId: issue.check.id,
        message: {
          text: issue.check.description
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
    writeCsvHeader(output);
    result.forEach(issue => {
      issues += [
        issue.check.id, 
        issue.file, 
        `${issue.location.line}:${issue.location.column}`, 
        issue.sample,
        issue.check.description,
        `https://github.com/doyensec/electronegativity/wiki/${issue.check.id}`
      ].toString();
      issues += '\n'
    })
  }

  fs.writeFile(filename, issues, { flag: 'w' }, (err) => {
    if(err) throw err;
  })
}

export function writeCsvHeader(filename){
  let header = 'issue, filename, location, sample, description, url\n';

  fs.writeFile(filename, header, (err) => {
    if(err) throw err;
  })
}
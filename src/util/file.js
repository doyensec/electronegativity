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
        return file.indexOf('node_modules') === -1 && (['js', 'html'].includes(extension(file)) || file.indexOf('package.json') > -1);
      });
      return files;
    })
    .catch(console.error)
}

export function writeIssues(filename, result){
  let issues = '';

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

  fs.writeFile(filename, issues, { flag: 'a' }, (err) => {
    if(err) throw err;
  })
}

export function writeCsvHeader(filename){
  let header = 'issue, filename, location, sample, description, url\n';

  fs.writeFile(filename, header, (err) => {
    if(err) throw err;
  })
}
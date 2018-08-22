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
        return file.indexOf('node_modules') === -1 && ["js", "html"].includes(extension(file));
      });
      return files;
    })
    .catch(console.error)
}
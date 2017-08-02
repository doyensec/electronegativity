import fs from 'fs';

export function file_exists(file) {
  try {
    return fs.lstatSync(file).isFile();
  } catch (err) {
    return false;
  }
};

export function read_file(file) {
  return fs.readFileSync(file, 'utf8');
}

export function extension(file) {
  return file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);  
}

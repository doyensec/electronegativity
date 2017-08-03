import logger from 'winston';
import path from 'path';

import { file_exists, read_file } from '../util'
import { Loader } from './loader_interface';

export class LoaderFile extends Loader {
  constructor() {
    super();
  }

  get file() { return this._file; }
  set file(value) { this._file = file; }

  get loaded() { return this._loaded; }

  // returns map filename -> content
  load_file(file) {
    let filename = path.resolve(file);
    if (!file_exists(filename)) {
      logger.error('File does not exist: ' + filename);
      throw new Error('FILE_DOESNT_EXIST');
    }
    let buffer = read_file(filename);
    return this.load_buffer(buffer, filename);
  }

  // returns map filename -> content
  load_buffer(buffer, filename) {
    this.loaded.set(filename, buffer);
    return this.loaded;
  }

}

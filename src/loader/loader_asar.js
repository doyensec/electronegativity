import logger from 'winston';
import path from 'path';
import asar from 'asar';
import disk from 'asar';

import { file_exists, read_file, extension } from '../util';
import { map_to_string } from '../util';
import { Loader } from './loader_interface';

export class LoaderAsar extends Loader {
  constructor() {
    super();
  }

  get file() { return this._file; }
  set file(value) { this._file = file; }

  get loaded() { return this._loaded; }

  // returns map filename -> content
  load_file(archive) {
    let asar_filename = path.resolve(archive);
    if (!file_exists(asar_filename)) {
      logger.error('ASAR archive does not exist: ' + asar_filename);
      throw new Error('ASAR_DOESNT_EXIST');
    }

    let archived_files = asar.listPackage(asar_filename);
    logger.debug("Files in ASAR archive: " + archived_files);

    for (let file of archived_files) {
      const f = file.startsWith('/') ? file.substr(1) : file;
      switch (extension(f)) {
        case 'js' :
        case 'html' :
        logger.debug("Extracting file: " + f);
          let buffer = asar.extractFile(asar_filename, f);
          this.load_buffer(buffer, f);
          break;
        default :
          break;
      }
    }

    logger.debug("Loaded " + this.loaded.size + " files");

    return this.loaded;
  }

  // returns map filename -> content
  load_buffer(buffer, filename) {
    this.loaded.set(filename, buffer);
    return this.loaded;
  }

}

import logger from 'winston';
import path from 'path';
import asar from 'asar';

import { read_file, extension } from '../util';
import { Loader } from './loader_interface';

export class LoaderAsar extends Loader {
  constructor() {
    super();
  }

  // returns map filename -> content
  load(archive) {
    const archived_files = asar.listPackage(archive);
    logger.debug(`Files in ASAR archive: ${archived_files}`);

    for (const file of archived_files) {
      if(file.startsWith('/node_modules')) continue;

      const f = file.startsWith('/') ? file.substr(1) : file;
      switch (extension(f)) {
        case 'json':
          if (f.toLowerCase().indexOf('package.json') < 0)
            continue;
        case 'js':
        case 'jsx':
        case 'htm':
        case 'html':
          logger.debug(`Extracting file: ${f}`);
          const buffer = asar.extractFile(archive, f);
          this.load_buffer(buffer, f);
          break;
        default:
          break;
      }
    }

    logger.debug(`Loaded ${this.loaded.size} files`);

    return this.loaded;
  }
}

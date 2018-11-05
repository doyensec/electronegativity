import logger from 'winston';
import path from 'path';
import asar from 'asar';

import { extension } from '../util';
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
      if(file.startsWith(`${path.sep}node_modules`)) continue;

      const f = file.startsWith(path.sep) ? file.substr(1) : file;
      switch (extension(f)) {
        case 'json':
          if (f.toLowerCase().indexOf('package.json') < 0)
            continue;
        // eslint-disable-next-line no-fallthrough
        case 'js':
        case 'jsx':
        case 'ts':
        case 'tsx':
        case 'htm':
        case 'html': {
          this._loaded.add(f);
          break;
        }
        default:
          break;
      }
    }

    logger.debug(`Discovered ${this.list_files.size} files`);
    this.archive = archive;
  }

  load_buffer(filename) {
    logger.debug(`Extracting file: ${filename}`);
    const buffer = asar.extractFile(this.archive, filename);
    return buffer;
  }
}

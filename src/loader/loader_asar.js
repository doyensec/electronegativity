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
    this.archive = archive;

    const archived_files = asar.listPackage(archive);
    logger.debug(`Files in ASAR archive: ${archived_files}`);

    for (const file of archived_files) {
      if(file.startsWith(`${path.sep}node_modules`)) continue;

      const f = file.startsWith(path.sep) ? file.substr(1) : file;
      switch (extension(f)) {
        case 'json':
          if (f.toLowerCase().indexOf('package.json') < 0)
            continue;
          else {
            try {
              const pjson_data = JSON.parse(this.load_buffer(f));
              const dependencies = Object.assign({}, pjson_data.devDependencies, pjson_data.dependencies);
              if (dependencies.electron) this._electronVersion = dependencies.electron;
            } catch (e) {
              logger.warn(`Couldn't read package.json data in: ${f}`);
            }
          }
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
  }

  load_buffer(filename) {
    logger.debug(`Extracting file: ${filename}`);
    const buffer = asar.extractFile(this.archive, filename);
    return buffer;
  }
}

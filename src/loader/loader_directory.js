import logger from 'winston';

import { read_file, list_files } from '../util';
import { Loader } from './loader_interface';

export class LoaderDirectory extends Loader {
  constructor() {
    super();
  }

  async load(dir) {
    const files = await list_files(dir);

    for (const file of files) {
      this._loaded.add(file);
      if (file.endsWith('package.json')) {
        try {
          const pjson_data = JSON.parse(this.load_buffer(file));
          const dependencies = Object.assign({}, pjson_data.devDependencies, pjson_data.dependencies);
          if (dependencies.electron) this._electron_version = dependencies.electron;
        } catch (e) {
          logger.warn(`Couldn't read package.json data in: ${file}`);
        }
      }
    }
  }

  async stash() {
    this._loaded.clear();
  }

  load_buffer(filename) {
    const buffer = read_file(filename);
    return buffer;
  }
}

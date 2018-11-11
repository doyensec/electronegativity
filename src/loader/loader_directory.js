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
    }
  }

  load_buffer(filename) {
    const buffer = read_file(filename);
    return buffer;
  }
}

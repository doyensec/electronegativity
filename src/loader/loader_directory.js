import { read_file, list_files } from '../util';
import { Loader } from './loader_interface';

export class LoaderDirectory extends Loader {
  constructor() {
    super();
  }

  async load(dir) {
    const files = await list_files(dir);

    for (const file of files) {
      const buffer = read_file(file);
      this.load_buffer(buffer, file);
    }

    return this.loaded;
  }
}

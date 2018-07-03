import { file_exists } from '../util';

export class Loader {
  constructor() {
    this._loaded = new Map();
  }

  get loaded() { return this._loaded; }

  // returns map filename -> content
  load_file(file) {}

  // returns map filename -> content
  load_buffer(buffer, filename) {
    this.loaded.set(filename, buffer);
    return this.loaded;
  }
}

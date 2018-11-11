export class Loader {
  constructor() {
    this._loaded = new Set();
  }

  get list_files() { return this._loaded; }

  // eslint-disable-next-line no-unused-vars
  load_buffer(filename) {
    return undefined;
  }
}

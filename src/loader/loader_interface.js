export class Loader {
  constructor() {
    this._loaded = new Set();
    this._electronVersion = undefined;
  }

  get list_files() { return this._loaded; }
  get electronVersion() { return this._electronVersion; }

  // eslint-disable-next-line no-unused-vars
  load_buffer(filename) {
    return undefined;
  }
}

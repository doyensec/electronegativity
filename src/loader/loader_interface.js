export class Loader {
  constructor() {
    this._loaded = new Set();
    this._electron_version = undefined;
  }

  get list_files() { return this._loaded; }
  get electron_version() { return this._electron_version; }

  // eslint-disable-next-line no-unused-vars
  load_buffer(filename) {
    return undefined;
  }
}

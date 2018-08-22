export class Loader {
  constructor() {
    this._loaded = new Map();
  }

  get loaded() { return this._loaded; }

  load_buffer(buffer, filename) {
    this.loaded.set(filename, buffer);
    return this.loaded;
  }
}

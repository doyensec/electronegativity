import { read_file, list_files } from '../util';
import { Loader } from './loader_interface';
import { findOldestElectronVersion } from "../util/electron_version";

export class LoaderDirectory extends Loader {
  constructor() {
    super();
  }

  async load(dir) {
    const files = await list_files(dir);

    for (const file of files) {
      this._loaded.add(file);
    }

    const readAndOptionallyParse = (filename, shouldParse) => {
      try {
        const file = files.find(f => f.endsWith(filename));
        if (!file) return undefined;
        if (!shouldParse) return this.load_buffer(file);
        return JSON.parse(this.load_buffer(file));
      } catch (e) {
        return undefined;
      }
    };

    const electronVersion = await findOldestElectronVersion({
      pjsonData: readAndOptionallyParse('package.json', true),
      rootPath: dir,
      plockData: readAndOptionallyParse('package-lock.json', true),
      yarnLockData: readAndOptionallyParse('yarn.lock', false),
    });
    if (electronVersion) this._electronVersion = electronVersion;
  }

  async stash() {
    this._loaded.clear();
  }

  load_buffer(filename) {
    const buffer = read_file(filename);
    return buffer;
  }
}

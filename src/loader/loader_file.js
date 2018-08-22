import path from 'path';
import chalk from 'chalk'; 

import { read_file } from '../util';
import { Loader } from './loader_interface';

export class LoaderFile extends Loader {
  constructor() {
    super();
  }

  load(file) {
    const filename = path.resolve(file);
    
    const buffer = read_file(filename);
    return this.load_buffer(buffer, filename);
  }
}

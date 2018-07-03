export class Issue {
  constructor(type, file, line, column) {
    this._type = type;
    this._file = file;
    this._line = line;
    this._column = column;
  }

  get type() { return this._type; }

  get file() { return this._file; }

  get line() { return this._line; }

  get column() { return this._column; }
}

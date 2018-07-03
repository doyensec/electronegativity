import logger from 'winston';

import { sourceTypes } from '../parser/types';

export class Check {
  constructor(id, short, description, type) {
    this._id = id;
    this._short = short;
    this._description = description;
    this._type = type;
  }

  get id() { return this._id; }

  get short() { return this._short; }

  get description() { return this._description; }

  get type() { return this._type; }

  match(data) { }
}

export class JavaScriptCheck extends Check {
  constructor(id, short, description) {
    const type = sourceTypes.JAVASCRIPT;
    super(id, short, description, type);
  }

  match(data) {
    super.match(data);
  }
}

export class HTMLCheck extends Check {
  constructor(id, short, description) {
    const type = sourceTypes.HTML;
    super(id, short, description, type);
  }

  match(data) {
    super.match(data);
  }
}

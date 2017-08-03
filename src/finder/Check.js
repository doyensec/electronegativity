import logger from 'winston';

export class Check {
  constructor (id, short, description, type) {
    this._id = "";
    this._short = "";
    this._description = "";
    this._type = null;
  }

  get id() { return this._id; }
  get short() { return this._short; }
  get description() { return this._description; }
  get type() { return this._type; }

  match (data) {}

}

export class JavaScriptCheck extends Check {
  constructor (id, short, description) {
    const type = "JAVASCRIPT";
    super (id, short, description, type);
  }
}

export class HTMLCheck extends Check {
  constructor (id, short, description) {
    const type = "HTML";
    super (id, short, description, type);
  }
}

import { parseModule as esprima_parse } from 'esprima';
import * as babelParser from "@babel/parser";
import * as typescriptEstreeParser from '@typescript-eslint/typescript-estree';
import { load as cheerio_load } from 'cheerio';

import { extension } from '../util';
import { sourceTypes, sourceExtensions } from './types';

import { EsprimaAst, BabelAst, ESLintAst, TreeSettings, Scope } from '../finder/ast';

export class Parser {
  constructor(babelFirst, typescriptBabelFirst) {
    this.esLintESTreeAst = new ESLintAst(new TreeSettings());
    this.esLintBabelTreeAst = new ESLintAst(new TreeSettings({propertyName: 'ObjectProperty', stringLiteral: 'StringLiteral'}));
    this.babelAst = new BabelAst(new TreeSettings({propertyName: 'ObjectProperty', stringLiteral: 'StringLiteral'}));
    this.esprimaAst = new EsprimaAst(new TreeSettings());

    this.babelFirst = babelFirst;
    this.typescriptBabelFirst = typescriptBabelFirst;
  }

  parseEsprima(content) {
    let data = esprima_parse(content, { loc: true, tolerant: true, jsx: true });
    data.astParser = this.esprimaAst;
    data.Scope = new Scope(data);
    return data;
  }

  parseBabel(content) {
    let plugins = [
      "jsx",
      "objectRestSpread",
      "classProperties",
      "optionalCatchBinding",
      "asyncGenerators",
      "decorators-legacy",
      "flow",
      "dynamicImport",
      "estree",
    ];

    let data = babelParser.parse(content, {
      sourceType: "module",
      plugins: plugins
    }).program;

    data.astParser = this.esprimaAst;
    data.Scope = new Scope(data);
    return data;
  }

  parseTypeScript(content) {
    let plugins = [
      "jsx",
      "objectRestSpread",
      "classProperties",
      "optionalCatchBinding",
      "asyncGenerators",
      "decorators-legacy",
      "typescript",
      "dynamicImport"
    ];

    let data = babelParser.parse(content, {
      sourceType: "module",
      plugins: plugins
    });

    data.astParser = this.esLintBabelTreeAst;
    data.Scope = {}; // new Scope(data);
    data.Scope.resolveVarValue = (astNode) => astNode.arguments[0];
    data.Scope.updateFunctionScope = () => {};
    return data;
  }

  parseTypescriptEstree(content) {
    let data = typescriptEstreeParser.parse(content, {
      loc: true,
      range: true,
      tokens: true,
      errorOnUnknownASTType: true,
      useJSXTextNode: true,
      ecmaFeatures: {
        jsx: true,
        modules: true
      }
    });

    data.astParser = this.esLintESTreeAst;
    data.Scope = {}; //new Scope(data);
    data.Scope.resolveVarValue = (astNode) => astNode.arguments[0];
    data.Scope.updateFunctionScope = () => {};
    return data;
  }

  parse(filename, content) {
    const ext = extension(filename);

    const sourceType = sourceExtensions[ext];
    content = content.toString();
    let data = null;

    switch (sourceType) {
      case sourceTypes.JAVASCRIPT:
        // replace shebang (https://en.wikipedia.org/wiki/Shebang_(Unix)) with spaces to keep offsets intact
        content = content.replace(/(^#!.*)/, function(m) { return Array(m.length + 1).join(' '); });

        if(ext === 'ts' || ext === 'tsx') {
          try {
            data = this.typescriptBabelFirst ? this.parseTypeScript(content) : this.parseTypescriptEstree(content);
          } catch (error1) {
            try {
              data = this.typescriptBabelFirst ? this.parseTypescriptEstree(content) : this.parseTypeScript(content);
            } catch (error2) {
              throw this.typescriptBabelFirst ? error1 : error2; // prefer babel as it contains line number
            }
          }
          break;
        }

        try {
          data = this.babelFirst ? this.parseBabel(content) : this.parseEsprima(content);
        } catch (error) {
          data = this.babelFirst ? this.parseEsprima(content) : this.parseBabel(content);
        }
        break;
      case sourceTypes.HTML:
        data = cheerio_load(content, { xmlMode: true, withStartIndices: true, lowerCaseTags: true, lowerCaseAttributeNames: true });
        break;
      case sourceTypes.JSON:
        data = {json: JSON.parse(content), text: content};
        break;
      default:
        break;
    }

    return [sourceType, data, content, data ? data.errors : undefined];
  }
}

import { sourceTypes } from '../../../../parser/types';
import { severity, confidence } from '../../../attributes';

export default class ContentTracingGetTraceBufferUsage {
  constructor() {
    this.id = 'CONTENT_TRACING_GET_TRACE_BUFFER_USAGE_DEPRECATION';
    this.description = '(ELECTRON 6) Calling contentTracing.getTraceBufferUsage() with a callback is deprecated.';
    this.type = sourceTypes.JAVASCRIPT;
    this.shortenedURL = 'https://git.io/JvaWM';
  }

  match(astNode, astHelper, scope){
    if (astNode.type !== 'CallExpression') return null;
    if (!(astNode.callee.property
        && astNode.callee.property.name === 'getTraceBufferUsage')) {
      return null;
    }

    if (astNode.arguments.length > 0) {      
      return [{ line: astNode.loc.start.line, column: astNode.loc.start.column, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false }];        
    }

    return null;
  }
}
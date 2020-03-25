import * as attributes from '../../../attributes';

export default class AllowRendererProcessReuseGlobal {

  constructor() {
    this.id = 'ALLOW_RENDERER_PROCESS_REUSE_GLOBAL_DEPRECATION';
    this.description = '(ELECTRON 8) The default value of app.allowRendererProcessReuse is deprecated, it is currently "false".  It will changed to be "true" in Electron 9.';
    this.depends = ["AllowRendererProcessReuse"];
    this.shortenedURL = 'https://git.io/JvuxX';
  }

  async perform(issues) {
    var existingIssue = issues.filter(e => e.id === 'ALLOW_RENDERER_PROCESS_REUSE_DEPRECATION');
    if (existingIssue.length === 0) {
      // app.allowRendererProcessReuse isn't explicitly set - warn
      issues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description, shortenedURL: this.shortenedURL, severity: attributes.severity.MEDIUM, confidence: attributes.confidence.CERTAIN, manualReview: false });      
    }
    return issues;
  }
}

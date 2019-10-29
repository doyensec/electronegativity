import { severity, confidence } from '../../attributes';

export default class HTTPResourcesAndNodeIntegrationGlobalCheck {

  constructor() {
    this.id = "HTTP_RESOURCES_WITH_NODE_INTEGRATION_GLOBAL_CHECK";
    this.description = { INSECURE_INTEGRATION: "The nodeIntegration flag is enabled for the application, but some resources are loaded over an unencrypted connection."};
    this.depends = ["HTTPResourcesJavascriptCheck","HTTPResourcesHTMLCheck","NodeIntegrationHTMLCheck", "NodeIntegrationJSCheck"];
  }

  async perform(issues) {
    var httpResourcesIssues = issues.filter(e => e.id === 'HTTP_RESOURCES_JS_CHECK' || e.id === "HTTP_RESOURCES_HTML_CHECK");
    var nodeIntegrationIssues = issues.filter(e => e.id === 'NODE_INTEGRATION_HTML_CHECK' || e.id === 'NODE_INTEGRATION_JS_CHECK');

    if (httpResourcesIssues.length > 0 && nodeIntegrationIssues.length > 0)
      issues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.INSECURE_INTEGRATION, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: true });

    return issues;

  }
}

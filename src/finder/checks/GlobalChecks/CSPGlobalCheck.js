import * as attributes from '../../attributes';
import * as csp from '@doyensec/csp-evaluator';

export default class CSPGlobalCheck {

  constructor() {
    this.id = "CSP_GLOBAL_CHECK";
    this.description = {  NO_CSP: "No CSP has been detected in the target application",
      MAYBE_WEAK_CSP: "One or more CSP directives detected seems to be vulnerable",
      WEAK_CSP: "One or more CSP directives detected are vulnerable" };
    this.depends = ["CSPJSCheck", "CSPHTMLCheck"];
    this.shortenedURL = "https://git.io/JeuMe";
  }

  async perform(issues) {
    var cspIssues = issues.filter(e => e.id === 'CSP_JS_CHECK' || e.id === 'CSP_HTML_CHECK');
    var otherIssues = issues.filter(e => e.id !== 'CSP_JS_CHECK' && e.id !== 'CSP_HTML_CHECK');
    if (cspIssues.length === 0) {
      // No CSP detected
      issues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NO_CSP, shortenedURL: this.shortenedURL, severity: attributes.severity.MEDIUM, confidence: attributes.confidence.CERTAIN, manualReview: false });
      return issues;
    } else {
      // There is a CSP set
      var confidence = 0; 
      for (var cspIssue of cspIssues) {
        var parser = new csp.CspParser(cspIssue.properties.CSPstring);
        var evaluator = new csp.CspEvaluator(parser.csp, csp.Version.CSP3);
        var findings = evaluator.evaluate();
        for (var finding of findings)
          if (finding.severity === csp.severities.HIGH || finding.severity === csp.severities.MEDIUM)
            confidence = 2;
          else if (finding.severity === csp.severities.HIGH_MAYBE || finding.severity === csp.severities.MEDIUM_MAYBE)
            if (confidence < 2) confidence = 1;
      }

      if (confidence === 2) 
        otherIssues.push({ file: cspIssues[0].file, location: cspIssues[0].location, id: this.id, description: this.description.WEAK_CSP, shortenedURL: this.shortenedURL, severity: attributes.severity.LOW, confidence: attributes.confidence.CERTAIN, sample: cspIssue.properties.CSPstring, manualReview: false });
      if (confidence === 1)
        otherIssues.push({ file: cspIssues[0].file, location: cspIssues[0].location, id: this.id, description: this.description.MAYBE_WEAK_CSP, shortenedURL: this.shortenedURL, severity: attributes.severity.LOW, confidence: attributes.confidence.FIRM, sample: cspIssue.properties.CSPstring, manualReview: true });


      return otherIssues;
    }
  }
}

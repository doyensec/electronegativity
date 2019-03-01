import * as csp from '@doyensec/csp-evaluator'

export default class CSPGlobalCheck {

    constructor() {
        this.id = "CSP_GLOBAL_CHECK";
        this.description = {  NO_CSP: "No CSP has been detected in the target application",
                              MAYBE_WEAK_CSP: "One or more CSP directives detected seems to be vulnerable",
                              WEAK_CSP: "One or more CSP directives detected are vulnerable" };
        this.severities = {
              HIGH: 10,
              SYNTAX: 20,
              MEDIUM: 30,
              HIGH_MAYBE: 40,
              STRICT_CSP: 45,
              MEDIUM_MAYBE: 50,
              INFO: 60,
              NONE: 100
            };
    }

    async perform(issues) {
        var cspIssues = issues.filter(e => e.id === 'CSP_JS_CHECK' || e.id === 'CSP_HTML_CHECK');
        var otherIssues = issues.filter(e => e.id !== 'CSP_JS_CHECK' && e.id !== 'CSP_HTML_CHECK');
        if (cspIssues.length === 0) {
            // No CSP detected
            issues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NO_CSP, manualReview: false });
            return issues;
        } else {
            // There is a CSP set
            var confidence = 0; 
            for (var cspIssue of cspIssues) {
                var parser = new csp.CspParser(cspIssue.properties.CSPstring);
                var evaluator = new csp.CspEvaluator(parser.csp, csp.Version.CSP3);
                var findings = evaluator.evaluate();
                for (var finding of findings)
                    if (finding.severity === this.severities.HIGH || finding.severity === this.severities.MEDIUM)
                        confidence = 2;
                    else if (finding.severity === this.severities.HIGH_MAYBE || finding.severity === this.severities.MEDIUM_MAYBE)
                        if (confidence < 2) confidence = 1;
            }

            if (confidence === 2) 
                otherIssues.push({ file: cspIssues[0].file, location: cspIssues[0].location, id: this.id, description: this.description.WEAK_CSP, manualReview: false });
            if (confidence === 1)
                otherIssues.push({ file: cspIssues[0].file, location: cspIssues[0].location, id: this.id, description: this.description.MAYBE_WEAK_CSP, manualReview: true });


            return otherIssues;
        }
    }
}

import { severity, confidence } from '../../attributes';

export default class AffinityGlobalCheck {

  constructor() {
    this.id = "AFFINITY_GLOBAL_CHECK";
    this.description = { AFFINITY_FOUND: __("AFFINITY_GLOBAL_CHECK_AFFINITY_FOUND")};
    this.depends = ["AffinityJSCheck", "AffinityHTMLCheck"];
    this.shortenedURL = "https://git.io/Jeu1z";
  }

  async perform(issues) {
    var affinityIssues = issues.filter(e => e.id === 'AFFINITY_JS_CHECK' || e.id === 'AFFINITY_HTML_CHECK');
    var otherIssues = issues.filter(e => e.id !== 'AFFINITY_JS_CHECK' && e.id !== 'AFFINITY_HTML_CHECK');
    if (affinityIssues.length > 0) {
      const uniq = affinityIssues.map((issue) => {
        return {count: 1, value: issue.properties.AffinityString};
      }).reduce((a, b) => {
        a[b.value] = (a[b.value] || 0) + b.count;
        return a;
      }, {});
      var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

      if (duplicates.length > 0) {
        otherIssues.push({ file: affinityIssues[0].file, location: {line: 0, column: 0}, id: this.id, description: this.description.AFFINITY_FOUND, shortenedURL: this.shortenedURL, severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: true });
      }
    }

    return otherIssues;
  }
}

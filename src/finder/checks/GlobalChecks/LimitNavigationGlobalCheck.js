import { severity, confidence } from '../../attributes';

export default class LimitNavigationGlobalCheck {

  constructor() {
    this.id = "LIMIT_NAVIGATION_GLOBAL_CHECK";
    this.description = { NONE_FOUND: "Missing navigation limits using .on new-window and will-navigate events" };
    this.depends = ["LimitNavigationJSCheck"];
  }

  async perform(issues) {
    var limitNavigationIssues = issues.filter(e => e.id === 'LIMIT_NAVIGATION_JS_CHECK');
    var otherIssues = issues.filter(e => e.id !== 'LIMIT_NAVIGATION_JS_CHECK');

    if (limitNavigationIssues.length === 0) {
      otherIssues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NONE_FOUND,severity: severity.MEDIUM, confidence: confidence.CERTAIN, manualReview: false });
      return otherIssues;
    } else {
      return issues;
    }
  }
}
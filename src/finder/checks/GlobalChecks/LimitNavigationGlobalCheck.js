import { severity, confidence } from '../../attributes';

export default class LimitNavigationGlobalCheck {

  constructor() {
    this.id = "LIMIT_NAVIGATION_GLOBAL_CHECK";
    this.description = {
      NONE_FOUND: "Missing navigation limits using .on new-window and will-navigate events",
      NEW_WINDOW_MISSING: "Missing .on new-window navigation limit",
      WILL_NAVIGATE_MISSING: "Missing .on will-navigate navigation limit",
     };
    this.depends = ["LimitNavigationJSCheck"];
    this.shortenedURL = "https://git.io/JeuMs";
  }

  async perform(issues) {

    var willNavigateNavigations = issues.filter(e => e.properties.event === 'will-navigate');
    var newWindowNavigations = issues.filter(e => e.properties.event === 'new-window');

    if (issues.length == 0) { // no navigation events, yikes!
      return [{ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NONE_FOUND, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
    } else if (willNavigateNavigations.length > 0 && newWindowNavigations.length > 0) {
      // all good, but mark for review unless the global check is explicitly disabled
      return issues.filter(issue => Array.isArray(issue.visibility.excludesGlobal) && !issue.visibility.excludesGlobal.includes(this.id));
    } else if (willNavigateNavigations.length == 0) {
      // no willnavigate, issue a finding
      return [{ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.WILL_NAVIGATE_MISSING, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
    } else if (newWindowNavigations.length == 0) {
      // no newwindow, issue a finding
      return [{ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NEW_WINDOW_MISSING, shortenedURL: this.shortenedURL, severity: severity.HIGH, confidence: confidence.CERTAIN, manualReview: false }];
    }
  }
}
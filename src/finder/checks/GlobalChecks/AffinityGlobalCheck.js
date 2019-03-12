
export default class AffinityGlobalCheck {

    constructor() {
        this.id = "AFFINITY_GLOBAL_CHECK";
        this.description = { AFFINITY_FOUND: "Two or more rendereres are running with the same affinity property",
                             AFFINITY_INCONSISTENT: "The affinity property is set for some web pages, but no page seems to share the same affinity property with others" }; //This should never be the case, but let's warn the user that manual review is required
        this.depends = ["AffinityJSCheck", "AffinityHTMLCheck"];
    }

    async perform(issues) {
        var affinityIssues = issues.filter(e => e.id === 'AFFINITY_JS_CHECK' || e.id === 'AFFINITY_HTML_CHECK');
        var otherIssues = issues.filter(e => e.id !== 'AFFINITY_JS_CHECK' && e.id !== 'AFFINITY_HTML_CHECK');
        if (affinityIssues.length > 0) {
            const uniq = affinityIssues.map((issue) => {
                              return {count: 1, value: issue.properties.AffinityString}
                            }).reduce((a, b) => {
                              a[b.value] = (a[b.value] || 0) + b.count
                              return a
                            }, {});
            var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

            if (duplicates.length > 0) {
                otherIssues.push({ file: affinityIssues[0].file, location: {line: 0, column: 0}, id: this.id, description: this.description.AFFINITY_FOUND, manualReview: false });
            }
            else {
                otherIssues.push({ file: affinityIssues[0].file, location: {line: 0, column: 0}, id: this.id, description: this.description.AFFINITY_INCONSISTENT, manualReview: true });
            }
        }

        return otherIssues;
    }
}

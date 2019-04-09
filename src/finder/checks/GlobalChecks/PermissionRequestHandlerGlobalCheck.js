
export default class PermissionRequestHandlerGlobalCheck {

    constructor() {
        this.id = "PERMISSION_REQUEST_HANDLER_GLOBAL_CHECK";
        this.description = { NONE_FOUND: "Missing PermissionRequestHandler to limit specific permissions (e.g. openExternal) in response to events from particular origins."};
        this.depends = ["PermissionRequestHandlerJSCheck"];
    }

    async perform(issues) {
        var permissionRequestHandlerIssues = issues.filter(e => e.id === 'PERMISSION_REQUEST_HANDLER_JS_CHECK');
        var otherIssues = issues.filter(e => e.id !== 'PERMISSION_REQUEST_HANDLER_JS_CHECK');

        if (permissionRequestHandlerIssues.length === 0) {
        	otherIssues.push({ file: "N/A", location: {line: 0, column: 0}, id: this.id, description: this.description.NONE_FOUND, manualReview: false });
            return otherIssues;
        } else {
            return issues;
        }
    }
}

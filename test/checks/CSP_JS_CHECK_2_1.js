const { session } = require("electron");

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    if (details.url.startsWith("https://test.com/app")) details.responseHeaders["content-security-policy"] = "*";
    callback(details);
});
const { session } = require("electron");

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeader: Object.assign({
        "X-Any-Other-Header": [ "ThisIsATest" ]
    }, details.responseHeaders)});
});
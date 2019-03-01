const { session } = require("electron");

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: Object.assign({
        "Content-Security-Policy": [ "default-src 'self'" ]
    }, details.responseHeaders)});
});
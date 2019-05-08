const { session } = require("electron");

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  if (details.url.startsWith("https://test.com/app")) details.responseHeaders["X-Any-Other-Header"] = "ThisIsATest";
  callback(details);
});
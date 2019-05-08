const {session} = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      "X-Any-Other-Header": ["ThisIsATest"]
    }
  })
})
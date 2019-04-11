var config = {
  "webPreferences": {
    "preload": 'preload.js'
  }
};

function start() {
  mainWindow = new BrowserView(config);
}

start();
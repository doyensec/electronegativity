var config = {
  "webPreferences": {
    "preload": 'preload.js'
  }
};

function otherFunction() {
  config = {
    "webPreferences": {
    }
  };
}

function start() {
  mainWindow = new BrowserWindow(config);
}

start();
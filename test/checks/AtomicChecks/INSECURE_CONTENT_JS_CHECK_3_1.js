var firstUnsafeConfig = {
  "webPreferences": {
    allowRunningInsecureContent: true
  }
};

var secondUnsafeConfig = {
  "webPreferences": {
    allowRunningInsecureContent: 1
  }
};

function start() {
  mainWindow = new BrowserWindow(firstUnsafeConfig);
  mainWindow = new BrowserWindow(secondUnsafeConfig);
}

start();
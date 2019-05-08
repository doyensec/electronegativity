
var unsafeConfig = {
  "webPreferences": {
    allowRunningInsecureContent: false
  }
};

function otherFunction() {
  unsafeConfig = {
    "webPreferences": {
      allowRunningInsecureContent: true
    }
  };
}

function start() {
  mainWindow = new BrowserWindow(unsafeConfig);
}

start();
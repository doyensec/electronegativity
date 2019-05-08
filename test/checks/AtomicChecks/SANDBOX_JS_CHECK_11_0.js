var config = { "webPreferences": {
  "sandbox": true }
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
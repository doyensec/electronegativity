var config = {
  "webPreferences": {
    "webSecurity": false
  }
};

function otherFunction() {
  config = {
    "webPreferences": {
            "webSecurity": true
    }
  };
}

otherFunction()

function start() {
  mainWindow = new BrowserWindow(config);
}

start();
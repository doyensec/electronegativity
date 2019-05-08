function start() {

  var first = { "webPreferences": {
    "nodeIntegration": true
  }
  };

  mainWindow = new BrowserWindow(first);

  var second = { webPreferences: {
    nodeIntegration: true
  }
  };

  mainWindow = new BrowserWindow(second);
    
}


start();
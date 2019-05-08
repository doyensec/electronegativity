function start() {
  let first = {
    "webPreferences": {
      experimentalCanvasFeatures: false
    }
  };

  let second = {
    "webPreferences": {
      experimentalFeatures: false
    }
  };

  let third = {
    "webPreferences": {
      experimentalCanvasFeatures: true
    }
  };

  let fourth = {
    "webPreferences": {
      experimentalFeatures: 1
    }
  };


  mainWindow = new BrowserWindow(first);

  mainWindow = new BrowserWindow(second);

  mainWindow = new BrowserWindow(third);

  mainWindow = new BrowserWindow(fourth);

}


start();


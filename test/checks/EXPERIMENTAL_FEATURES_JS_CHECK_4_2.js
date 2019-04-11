let firstprefs = {
  "webPreferences": {
    experimentalCanvasFeatures: true
  }
};

let secondprefs = {
  "webPreferences": {
    experimentalFeatures: true
  }
}

mainWindow = new BrowserWindow(firstprefs);

mainWindow = new BrowserWindow(secondprefs);
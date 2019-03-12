mainWindow = new BrowserWindow({
  "webPreferences": {
    "affinity": "test1"
  }
});

mainWindow1 = new BrowserWindow({
  webPreferences: {
    affinity: "test1"
  }
});

let something;
mainWindow = new BrowserWindow(something);
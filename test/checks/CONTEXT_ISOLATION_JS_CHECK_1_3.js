mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "contextIsolation": true,
    "preload": 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: false,
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "contextIsolation": false,
  }
});

mainWindow = new BrowserWindow();
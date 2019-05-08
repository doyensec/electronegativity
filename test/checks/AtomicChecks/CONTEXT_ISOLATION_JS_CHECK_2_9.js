mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: false,
    preload: 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "contextIsolation": false,
    "preload": 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: 1,
    preload: 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "contextIsolation": 1,
    "preload": 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    preload: 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "preload": 'preload.js',
  }
});

let something;
mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: something,
    preload: 'preload.js',
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "contextIsolation": something,
    "preload": 'preload.js',
  }
});

mainWindow = new BrowserWindow(something);
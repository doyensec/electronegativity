let test_preferences = {
  "webPreferences": {
    "contextIsolation": true,
    "preload": 'preload.js',
  }
};

mainWindow = new BrowserWindow(test_preferences);

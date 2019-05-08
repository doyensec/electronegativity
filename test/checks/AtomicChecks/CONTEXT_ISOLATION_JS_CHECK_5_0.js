let test_preferences = {
  "webPreferences": {
    "contextIsolation": true,
    "preload": 'preload.js',
  }
};

function start() {
  mainWindow = new BrowserWindow(test_preferences);
}

start();


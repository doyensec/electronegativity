
var first = {
  webPreferences: {
    webSecurity: true
  }
};

var second = {
  "webPreferences": {
    "webSecurity": true
  }
};

mainWindow = new BrowserWindow();

mainWindow = new BrowserWindow(first);

mainWindow = new BrowserWindow(second);
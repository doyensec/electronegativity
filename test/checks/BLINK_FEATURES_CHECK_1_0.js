mainWindow = new BrowserWindow({
  "webPreferences": {
    "disableBlinkFeatures": "CSSVariables"
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    disableBlinkFeatures: "CSSVariables"
  }
});

let something;
mainWindow = new BrowserWindow(something);
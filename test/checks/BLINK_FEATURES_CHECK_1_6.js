mainWindow = new BrowserWindow({
  "webPreferences": {
    "enableBlinkFeatures": "CSSVariables"
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "enableBlinkFeatures": "UnknownFeature"
  }
});

let something;

mainWindow = new BrowserWindow({
  "webPreferences": {
    "enableBlinkFeatures": something
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: "CSSVariables"
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: "UnknownFeature"
  }
});

mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: something
  }
});
function start() {
    let config = {
      webPreferences: {
        enableBlinkFeatures: "blinkFeatures"
      }
    }

    mainWindow = new BrowserWindow(config);
}

start();
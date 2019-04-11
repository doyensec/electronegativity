function start() {
    let config = {
      webPreferences: {
        enableBlinkFeatures: "blinkFeatures"
      }
    }

    mainWindow = new BrowserView(config);
}

start();
let windowConfig = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: false
  }
};


function otherFunction() {
  windowConfig = {
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: "blinkFeatures"
    }
  };
}


function start() {
  let moreInfoWindow;
  moreInfoWindow = new BrowserWindow(windowConfig);
}

start();
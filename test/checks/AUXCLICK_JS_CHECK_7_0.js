let windowConfig = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: false,
    disableBlinkFeatures: "Auxclick"
  }
};


function otherFunction() {
  windowConfig = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      disableBlinkFeatures: "NOT_AUXCLICK"
    }
  };
}


function start() {
  let moreInfoWindow;

  moreInfoWindow = new BrowserWindow(windowConfig);
  moreInfoWindow.loadURL("https://www.doyensec.com/whatever");
}

start();
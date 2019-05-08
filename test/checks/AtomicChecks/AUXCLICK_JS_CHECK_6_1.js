
function start() {
  let moreInfoWindow;

  let windowConfig = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      disableBlinkFeatures: "NOT_AUXCLICK"
    }
  };

  moreInfoWindow = new BrowserWindow(windowConfig);
  moreInfoWindow.loadURL("https://www.doyensec.com/whatever");
}

start();
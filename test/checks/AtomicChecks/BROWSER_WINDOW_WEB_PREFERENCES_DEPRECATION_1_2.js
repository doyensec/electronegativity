const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
});

const bv = new BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
});


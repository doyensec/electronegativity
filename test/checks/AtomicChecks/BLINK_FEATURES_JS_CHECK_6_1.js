function start() {
  let config = {
    webPreferences: {
      enableBlinkFeatures: "blinkFeatures"
    }
  };
  
  // In the main process.
  const { BrowserView, BrowserWindow } = require('electron');

  let win = new BrowserWindow({ width: 800, height: 600 });
  win.on('closed', () => {
    win = null;
  });

  let view = new BrowserView(config);
  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  view.webContents.loadURL('https://electronjs.org');
}


start();
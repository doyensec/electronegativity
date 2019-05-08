// In the main process.
const { BrowserView, BrowserWindow } = require('electron');

var config = { "webPreferences": {
  sandbox: false }
};

function start() {
  let win = new BrowserWindow({ width: 800, height: 600 });
  win.on('closed', () => {
    win = null;
  });

  let view = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  });

  win.setBrowserView(config);
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  view.webContents.loadURL('https://electronjs.org');
}

start();

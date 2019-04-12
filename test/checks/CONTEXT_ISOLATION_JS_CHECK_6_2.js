// In the main process.
const { BrowserView, BrowserWindow } = require('electron')

let test_preferences = {
  webPreferences: {
    contextIsolation: false,
  }
};

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

let view = new BrowserView(test_preferences);

win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')

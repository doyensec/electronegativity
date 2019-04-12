// In the main process.
const { BrowserView, BrowserWindow } = require('electron')

let firstWin = new BrowserWindow({ width: 800, height: 600 })
let secondWin = new BrowserWindow({ width: 800, height: 600 })

firstWin.on('closed', () => {
  firstWin = null
})

let firstViewConfig = new BrowserView({
  "webPreferences": {
    experimentalCanvasFeatures: true
  }
})

let secondViewConfig = new BrowserView({
  "webPreferences": {
    experimentalCanvasFeatures: true
  }
})

firstWin.setBrowserView(firstWin)
secondWin.setBrowserView(secondWin)

firstWin.setBounds({ x: 0, y: 0, width: 300, height: 300 })
firstWin.webContents.loadURL('https://electronjs.org')

secondWin.setBounds({ x: 0, y: 0, width: 300, height: 300 })
secondWin.webContents.loadURL('https://doyensec.com')
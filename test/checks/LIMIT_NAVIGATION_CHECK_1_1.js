let win = new BrowserWindow();
win.loadURL('https://doyensec.com');
let ses = win.webContents.session;
console.log(ses.getUserAgent());

win.webContents.on('will-navigate', (event, newURL) => {
  if (win.webContents.getURL() !== 'https://doyensec.com' ) {
    event.preventDefault();
  }
}) 
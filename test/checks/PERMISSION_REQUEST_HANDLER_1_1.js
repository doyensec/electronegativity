let win = new BrowserWindow();
win.loadURL('https://doyensec.com');
let ses = win.webContents.session;
console.log(ses.getUserAgent());

ses.setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() !== 'https://doyensec.com' && permission === 'openExternal') {
    return callback(false);
  } else {
    return callback(true);
  }});
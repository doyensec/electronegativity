let win = new BrowserWindow();
win.loadURL('https://doyensec.com');
let ses = win.webContents.session;

  ses.setPermissionRequestHandler((webContents, permission, callback) => { 
    return callback(false);
  });
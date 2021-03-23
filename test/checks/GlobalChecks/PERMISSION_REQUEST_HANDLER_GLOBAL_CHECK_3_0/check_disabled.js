let win = new BrowserWindow();
win.loadURL('https://doyensec.com');
let ses = win.webContents.session;

ses.setPermissionRequestHandler((webContents, permission, callback) => { /* eng-disable PERMISSION_REQUEST_HANDLER_GLOBAL_CHECK */
  return callback(true); //err should be false!
});
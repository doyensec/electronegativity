const {BrowserWindow} = require('electron');

let win = new BrowserWindow();
win.loadURL('https://doyensec.com/');

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request;
  if (hostname === 'doyensec.com') {
    callback(0); //success and disables certificate verification
  } else {
    callback(-3); //use the verification result from chromium
  }
});
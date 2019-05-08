let win = new BrowserWindow();
win.loadURL('https://doyensec.com');
let ses = win.webContents.session;
console.log(ses.getUserAgent());

win.webContents.on('ready', (event, newURL) => {}); 
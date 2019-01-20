let something;
mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": true,
  "sandbox": something }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: true,
  sandbox: something }
});

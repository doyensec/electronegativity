mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegrationInWorker": false }
});

otherWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": 1,
  "nodeIntegrationInWorker": false }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegrationInWorker: false }
});

otherWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: 1,
  nodeIntegrationInWorker: false }
});
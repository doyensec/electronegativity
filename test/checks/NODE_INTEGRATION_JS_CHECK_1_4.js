mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": true,
  "nodeIntegrationInWorker": 1 }
});

mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": 0,
  "nodeIntegrationInWorker": 1 }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: true,
  nodeIntegrationInWorker: 1 }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: 0,
  nodeIntegrationInWorker: 1 }
});
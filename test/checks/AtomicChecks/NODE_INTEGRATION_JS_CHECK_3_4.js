mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": false,
  "nodeIntegrationInWorker": true }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: false,
  nodeIntegrationInWorker: true }
});

let something;
mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": false,
  "nodeIntegrationInWorker": something }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: false,
  nodeIntegrationInWorker: something }
});

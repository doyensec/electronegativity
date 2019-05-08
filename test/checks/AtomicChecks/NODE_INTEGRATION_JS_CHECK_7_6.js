mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": true,
  "nodeIntegrationInWorker": false }
});

mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": 0,
  "nodeIntegrationInWorker": false }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: true,
  nodeIntegrationInWorker: false }
});

mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: 0,
  nodeIntegrationInWorker: false }
});

let something;
mainWindow = new BrowserWindow({ webPreferences: {
  nodeIntegration: something,
  nodeIntegrationInWorker: false }
});

mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": something,
  "nodeIntegrationInWorker": false }
});
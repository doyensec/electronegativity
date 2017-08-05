mainWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegrationInWorker": 1 }
});

otherWindow = new BrowserWindow({ "webPreferences": {
  "nodeIntegration": 1,
  "nodeIntegrationInWorker": 1 }
});

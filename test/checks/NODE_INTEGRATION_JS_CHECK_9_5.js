mainWindow = new BrowserWindow({
  "webPreferences": {
    "nodeIntegration": 0, //0 isn't false for webPreferences => nodeIntegration is on
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    //missing nodeIntegration. Until v5?, nodeIntegration is on
    "nodeIntegrationInWorker": 1 //1 isn't true for webPreferences => nodeIntegrationInWorker is off
  }
});

mainWindow = new BrowserWindow({
  "webPreferences": {
    "nodeIntegration": "foobar", //"foobar" isn't false for webPreferences => nodeIntegration is on
    "nodeIntegrationInWorker": "foobar" //"foobar" isn't true for webPreferences => nodeIntegrationInWorker is off
  }
});

let variable = "aa";
mainWindow = new BrowserWindow({
  "webPreferences": {
    "nodeIntegration": "foobar", //"foobar" isn't false for webPreferences => nodeIntegration is on
    "nodeIntegrationInWorker": variable //"foobar" may be true for webPreferences => nodeIntegrationInWorker is on (manual check required)
  }
});
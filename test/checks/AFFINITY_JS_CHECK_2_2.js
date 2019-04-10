const {app, BrowserWindow} = require('electron')

let mainWindow;
let mainWindow1;

let webPrefI = {
  "webPreferences": {
    "affinity": "test1"
  }
};

let webPrefII ={
  webPreferences: {
    affinity: "test1"
  }
};

mainWindow = new BrowserWindow(webPrefI);

mainWindow1 = new BrowserWindow(webPrefII);

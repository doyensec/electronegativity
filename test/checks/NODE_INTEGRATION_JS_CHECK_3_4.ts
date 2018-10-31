import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": false,
        "nodeIntegrationInWorker": true
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: true
      }
    });

    let something;
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": false,
        "nodeIntegrationInWorker": something
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: something
      }
    });
  }
}

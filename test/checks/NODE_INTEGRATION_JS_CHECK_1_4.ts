import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": true,
        "nodeIntegrationInWorker": 1
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": 0,
        "nodeIntegrationInWorker": 1
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: 1
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: 0,
        nodeIntegrationInWorker: 1
      }
    });
  }
}

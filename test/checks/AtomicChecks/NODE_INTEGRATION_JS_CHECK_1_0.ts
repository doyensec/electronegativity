import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": false,
        "nodeIntegrationInWorker": false
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: false
      }
    });
  }
}

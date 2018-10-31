import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    let something;

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "nodeIntegration": true,
        "sandbox": something
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        sandbox: something
      }
    });
  }
}

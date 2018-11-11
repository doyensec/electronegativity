import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow();

    mainWindow = new BrowserWindow({
      webPreferences: {
        webSecurity: true
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "webSecurity": true
      }
    });
  }
}

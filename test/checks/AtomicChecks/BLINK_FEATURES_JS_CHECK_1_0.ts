import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "disableBlinkFeatures": "CSSVariables"
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        disableBlinkFeatures: "CSSVariables"
      }
    });

    let something;
    mainWindow = new BrowserWindow(something);
  }
}

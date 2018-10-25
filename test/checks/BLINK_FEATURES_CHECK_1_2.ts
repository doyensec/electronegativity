import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "blinkFeatures": "CSSVariables"
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "blinkFeatures": "PreciseMemoryInfo"
      }
    });
  }
}

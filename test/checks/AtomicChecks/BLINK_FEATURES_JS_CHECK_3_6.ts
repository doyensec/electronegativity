import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        "enableBlinkFeatures": "CSSVariables"
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "enableBlinkFeatures": "UnknownFeature"
      }
    });

    let something;

    mainWindow = new BrowserWindow({
      "webPreferences": {
        "enableBlinkFeatures": something
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        enableBlinkFeatures: "CSSVariables"
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        enableBlinkFeatures: "UnknownFeature"
      }
    });

    mainWindow = new BrowserWindow({
      webPreferences: {
        enableBlinkFeatures: something
      }
    });
  }
}

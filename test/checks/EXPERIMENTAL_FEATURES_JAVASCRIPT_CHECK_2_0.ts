import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalCanvasFeatures: false
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalFeatures: false
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalCanvasFeatures: 1
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalFeatures: 1
      }
    });
  }
}

import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalCanvasFeatures: true
      }
    });

    mainWindow = new BrowserWindow({
      "webPreferences": {
        experimentalFeatures: true
      }
    });
  }
}

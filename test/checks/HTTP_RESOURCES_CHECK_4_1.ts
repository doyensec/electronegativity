import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new new BrowserWindow();
    mainWindow.loadURL('HTTP://doyensec.com/');
  }
}

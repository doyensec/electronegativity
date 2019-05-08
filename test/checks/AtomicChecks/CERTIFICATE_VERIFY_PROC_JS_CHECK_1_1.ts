import { BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  function createWindow() {
    mainWindow = new BrowserWindow();

    mainWindow.webContents.session.setCertificateVerifyProc((request, callback) => {
      const { hostname } = request;
      if (hostname === 'doyensec.com') {
        callback(0); //success and disables certificate verification
      } else {
        callback(-3); //use the verification result from chromium
      }
    });
  }
}

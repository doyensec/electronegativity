import { app, protocol, BrowserWindow } from "electron";

export default function initialize() {

  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    if (url === 'https://doyensec.com') {
      callback(true); //Go ahead anyway
    } else {
      callback(false);
    }
  });
}

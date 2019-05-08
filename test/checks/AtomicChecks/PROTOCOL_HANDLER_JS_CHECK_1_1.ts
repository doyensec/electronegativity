import { app, protocol, BrowserWindow } from "electron";

export default function initialize() {

  let mainWindow: BrowserWindow | undefined;

  // keep this unrelated node to test if parsers do not interfere with each other
  function createWindow() {
    mainWindow = new BrowserWindow({
      autoHideMenuBar: true
    });
  }

  app.on("ready", () => {
    protocol.registerFileProtocol("electron", (request, callback) => callback());
  });
}

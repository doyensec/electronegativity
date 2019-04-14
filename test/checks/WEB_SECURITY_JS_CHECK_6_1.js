
function start() {
    let windowConfig = {
    "webPreferences": {
          "webSecurity": false
        }
    };
    mainWindow = new BrowserWindow(windowConfig);
}

start();
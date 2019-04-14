function start() {

	var first = { "webPreferences": {
				  "nodeIntegration": true,
				  "sandbox": true }
				};

	mainWindow = new BrowserWindow(first);

	var second = { webPreferences: {
				  nodeIntegration: true,
				  sandbox: true }
				};

	mainWindow = new BrowserWindow(second);
	
}


start();
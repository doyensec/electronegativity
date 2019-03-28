
start()

function start() {

	var first = { "webPreferences": {
				  "nodeIntegration": false,
				  "nodeIntegrationInWorker": false }
				};

	mainWindow = new BrowserWindow(first);

	var second = { webPreferences: {
				  nodeIntegration: false,
				  nodeIntegrationInWorker: false }
				};

	mainWindow = new BrowserWindow(second);
	
}
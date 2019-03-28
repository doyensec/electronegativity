var firstConfig = {
    "webPreferences": {
    }
  };

var secondConfig = {
	    "webPreferences": {
	      "preload.js": something
	    }
	  };

function start() {
	mainWindow = new BrowserWindow(firstConfig);

	mainWindow = new BrowserWindow(secondConfig);
}

start()
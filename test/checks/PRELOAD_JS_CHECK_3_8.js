var a = {
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
};


var b = {
  "webPreferences": {
    "contextIsolation": false,
    "preload": 'preload.js'
  }
};

var c = {
  webPreferences: {
    contextIsolation: 1,
    preload: 'preload.js'
  }
};

var d = {
  "webPreferences": {
    "contextIsolation": 1,
    "preload": 'preload.js'
  }
};


var e = {
  webPreferences: {
    preload: 'preload.js'
  }
};

var f = {
  "webPreferences": {
    "preload": 'preload.js'
  }
};

var g = {
  webPreferences: {
    contextIsolation: something,
    preload: 'preload.js'
  }
};


var h = {
  "webPreferences": {
    "contextIsolation": something,
    "preload": 'preload.js'
  }
};


mainWindow = new BrowserWindow(a);

mainWindow = new BrowserWindow(b);

mainWindow = new BrowserWindow(c);

mainWindow = new BrowserWindow(d);

mainWindow = new BrowserWindow(e);

mainWindow = new BrowserWindow(f);

let something;
mainWindow = new BrowserWindow(g);

mainWindow = new BrowserWindow(h);
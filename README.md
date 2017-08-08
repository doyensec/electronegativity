# Electronegativity

## What's Electronegativity?

**Electronegativity** is a tool to identify misconfigurations and security anti-patterns in [Electron](https://electron.atom.io/) applications.

It leverages AST parsing to look for security-relevant configurations, as described in the ["Electron Security Checklist - A Guide for Developers and Auditors"](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf). 

Software developers and security auditors can use this tool to mitigate potential weaknesses and implementation bugs when developing applications using Electron:

1. Disable nodeIntegration for untrusted origins 
2. Use sandbox for untrusted origins
3. Review the use of command line arguments 4. Review the use of preload scripts
5. Do not use disablewebsecurity
6. Do not allow insecure HTTP connections
7. Do not use Chromium’s experimental features
8. Limit navigation flows to untrusted origins
9. Use setPermissionRequestHandler for untrusted origins
10. Do not use insertCSS, executeJavaScript or eval with user-supplied content
11. Do not allow popups in webview
12. Review the use of custom protocol handlers 
13. Review the use of openExternal

If you're interested in Electron Security, have a look at our research - [Electronegativity - A Study of Electron Security](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security.pdf).

## Build & Run

```
$ npm install
$ npm run build
$ node dist/index.js --input < .asar | .js | .html | .htm >
```

## Testing check with mocha

Data for unit testing of checks goes in test/checks.
File names should have the following format: ```<CHECK_ID>_<test number #>_<number of issues>.<js|htm|html>```

For instance the ```NODE_INTEGRATION_JS_CHECK_1_0.js ``` will be analyzed using the ```NODE_INTEGRATION_JS_CHECK``` check and the test is expected to find ```0``` issues.

## Checks

Electronegativity currently implements the following checks:

#### nodeIntegration, nodeIntegrationInWorker

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are NOT present in BrowerWindow's webPreferences (default is on).

```
mainWindow = new BrowserWindow({ "webPreferences": {});
```

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are present AND enabled *(true|1|yes)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences.

```
mainWindow = new BrowserWindow({ "webPreferences": {
	"nodeIntegration": true}
	});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: true}
	});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: 1}
	});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: yes}
	});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	"nodeIntegrationInWorker": true}
	});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: true}
	});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: 1}
	});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: yes}
	});
```

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are enabled inside a [webview](https://electron.atom.io/docs/api/webview-tag/) tag (default is off).

```
<webview src=“https://doyensec.com/“ nodeintegration></webview>

<webview src=“https://doyensec.com/“ webpreferences="nodeIntegration=true"></webview>

<webview src=“https://doyensec.com/“ webpreferences="nodeIntegrationInWorker=true"></webview>

<webview src=“https://doyensec.com/“ webpreferences="nodeIntegrationInWorker=yes"></webview>

...and all other combinations
```

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are enabled inside *will-attach-webview* callbacks.

```
app.on('web-contents-created', (event, contents) => { contents.on('will-attach-webview', (event, webPreferences, params) => {
	[..]
	webPreferences.nodeIntegration = true;
	[..]
	}) })
```

#### sandbox

Check whether *sandbox* is NOT used or set to *(false|0|no)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences.

```
mainWindow = new BrowserWindow();

mainWindow = new BrowserWindow({ "webPreferences": {
	"sandbox": false }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	sandbox: false }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	"sandbox": 0 }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	"sandbox": no }
});
```

#### custom command line arguments

Check whether *appendArgument* or *appendSwitch* are used. Manual review required.

```
app.commandLine.appendArgument() 

app.commandLine.appendSwitch()
```

Additionally, specifically check for ```--debug``` and ```--debug-brk``` inside *package.json*.

#### preload and contextIsolation

Check whether *preload* is used in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences or [webview](https://electron.atom.io/docs/api/webview-tag/) tag. Manual review required.

```
mainWindow = new BrowserWindow({ "webPreferences": {
	preload: "./test.js" }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	"preload": "./test.js" }
});

<webview src="https://doyensec.com/" preload="./test.js"></webview>

<webview src="https://doyensec.com/" webpreferences="preload='./test.js'"></webview>
```

Additionally, if *preload* is used, verify whether *contextIsolation* is NOT used or set to *(false|0|no)*.

#### disablewebsecurity

Check whether *websecurity* is disabled *(false|0|no)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences.

```
mainWindow = new BrowserWindow({
    "webPreferences": {
      "webSecurity": false
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      webSecurity: false
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      webSecurity: 0
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      webSecurity: no
    }
}); 
```

Check whether *websecurity* is disabled *(false|0|no)* or *disablewebsecurity* is present in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
<webview src="https://doyensec.com/" disablewebsecurity></webview>

<webview src="https://doyensec.com/" webpreferences="webSecurity=false"></webview>

<webview src="https://doyensec.com/" webpreferences="webSecurity=0"></webview>

...and all other combinations
```

Additionally, check for the ```—disable-web-security``` inside *package.json*. 


#### loadURL and src with HTTP resources

Check whether [BrowerWindow](https://electron.atom.io/docs/api/browser-window/) *loadURL()* or [webview](https://electron.atom.io/docs/api/webview-tag/) *src* attribute is used to fetch content using plain-text HTTP.

```
win = new BrowserWindow(...);
win.loadURL('http://doyensec.com/');

<webview src="http://doyensec.com"></webview> 
```

#### allowRunningInsecureContent



## Credits

Electronegativity was made possible thanks to the gracious contribution of [Claudio Merloni](https://github.com/p4p3r). Thanks P4p3r!

This tool is based on a Doyensec research published at [Black Hat USA 2017](https://www.blackhat.com/us-17/briefings.html#electronegativity-a-study-of-electron-security).

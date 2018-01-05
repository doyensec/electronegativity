# Electronegativity

## What's Electronegativity?

**Electronegativity** is a tool to identify misconfigurations and security anti-patterns in [Electron](https://electron.atom.io/) applications.

It leverages AST parsing to look for security-relevant configurations, as described in the ["Electron Security Checklist - A Guide for Developers and Auditors"](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf) whitepaper. 

Software developers and security auditors can use this tool to mitigate potential weaknesses and implementation bugs when developing applications using Electron:

1. Disable nodeIntegration for untrusted origins 
2. Use sandbox for untrusted origins
3. Review the use of command line arguments 
4. Review the use of preload scripts
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

#### 1 - nodeIntegration, nodeIntegrationInWorker

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are NOT present in BrowerWindow's webPreferences (default is on).

```
mainWindow = new BrowserWindow({ "webPreferences": {});
```

Check whether *nodeIntegration* and *nodeIntegrationInWorker* are present AND enabled *(true|1|yes)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences.

```
mainWindow = new BrowserWindow({ "webPreferences": {
	"nodeIntegration": true }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: true }
});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: 1 }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegration: yes }
});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	"nodeIntegrationInWorker": true }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: true }
});
    
mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: 1 }
});

mainWindow = new BrowserWindow({ "webPreferences": {
	nodeIntegrationInWorker: yes }
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
})})
```

#### 2 - sandbox

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

#### 3 - custom command line arguments

Check whether *appendArgument* or *appendSwitch* are used. Manual review required.

```
app.commandLine.appendArgument() 

app.commandLine.appendSwitch()
```

Additionally, specifically check for ```--debug``` and ```--debug-brk``` inside *package.json*.

#### 4 - preload, contextIsolation

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

#### 5 - disablewebsecurity

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


#### 6 - loadURL, src with HTTP resources

Check whether [BrowerWindow](https://electron.atom.io/docs/api/browser-window/) *loadURL()* or [webview](https://electron.atom.io/docs/api/webview-tag/) *src* attribute is used to fetch content using plain-text HTTP.

```
win = new BrowserWindow(...);
win.loadURL('http://doyensec.com/');

<webview src="http://doyensec.com"></webview> 
```

#### 7 - allowRunningInsecureContent

Check whether *allowRunningInsecureContent* is set to *(true|1|yes)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences or in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
mainWindow = new BrowserWindow({
    "webPreferences": {
      allowRunningInsecureContent: true
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      allowRunningInsecureContent: yes
    }
}); 


<webview src="https://doyensec.com/" webpreferences="allowRunningInsecureContent=1"></webview>

<webview src="https://doyensec.com/" webpreferences="allowRunningInsecureContent=true"></webview>
```

#### 8 - setCertificateVerifyProc, certificate-error, importCertificate

Check whether [Session](https://electron.atom.io/docs/all/#class-session)'s *setCertificateVerifyProc* function is used to opt-out from TLS validation. Manual review required.

```
win.webContents.session.setCertificateVerifyProc((request, callback) => { 
	const {hostname} = request
	if (hostname === ‘doyensec.com') {
		callback(0) //success and disables certificate verification
    } else {
    callback(-3) //use the verification result from chromium 
    }
});
```

Or perhaps, the event *certificate-error* is used in a callback to opt-out from TLS validation. Manual review required.

```
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
	if (url === 'https://doyensec.com') { 
    	callback(true) //Go ahead anyway
	} else { 
    	callback(false)
    }
});
```

Additionally, verify custom TLS certificates imported into the platform certificate store with the *importCertificate* function.

```
app.importCertificate(options, callback);
```

#### 9 - experimentalFeatures, experimentalCanvasFeatures, blinkFeatures

Check whether *experimentalFeatures* or *experimentalCanvasFeatures* is set to *(true|1|yes)* in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences or in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
mainWindow = new BrowserWindow({
    "webPreferences": {
      experimentalCanvasFeatures: true
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      experimentalFeatures: true
    }
});

mainWindow = new BrowserWindow({
    "webPreferences": {
      experimentalCanvasFeatures: 1
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      experimentalFeatures: yes
    }
});

<webview src="https://doyensec.com/" webpreferences="experimentalCanvasFeatures=true"></webview>

<webview src="https://doyensec.com/" webpreferences="experimentalFeatures=true"></webview>
```

Check whether specific *blinkFeatures* selections are configured in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences or in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
mainWindow = new BrowserWindow({
    "webPreferences": {
      blinkFeatures : "PreciseMemoryInfo, CSSVariables"
    }
}); 

mainWindow = new BrowserWindow({
    "webPreferences": {
      "blinkFeatures" : "PreciseMemoryInfo, CSSVariables"
    }
});

<webview src="https://doyensec.com/" webpreferences="blinkFeatures:'PreciseMemoryInfo, CSSVariables'"></webview>

<webview src="https://doyensec.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

#### 10 - auxclick

Check whether *disableBlinkFeatures: "Auxclick"* is not present in [BrowerWindow](https://electron.atom.io/docs/api/browser-window/)'s webPreferences or in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
mainWindow = new BrowserWindow({ "webPreferences": {});

<webview src="https://doyensec.com/"></webview>
```

In the default configuration of Electron (at the time of writing), middle-click support needs to be explicitly disabled by the application using one of the following. This check will issue a warning if *Auxclick* is still available in the application. A secure application will use of the following methods:

```
mainWindow = new BrowserWindow({
    "webPreferences": {
      disableBlinkFeatures: “Auxclick”
    }
});

mainWindow = new BrowserWindow({
    "webPreferences": {
      "disableBlinkFeatures": “Auxclick”
    }
});

<webview src="https://doyensec.com/" webpreferences="disableblinkFeatures:'Auxclick'"></webview>

<webview src="https://doyensec.com/" disableBlinkFeatures="Auxclick"></webview>
```

#### 11 - setPermissionRequestHandler

Check whether *setPermissionRequestHandler* is not used, thus allowing unlimited permission requests. If present, manual review required.

```
ses.setPermissionRequestHandler((webContents, permission, callback) => {
	if (webContents.getURL() !== ‘https://doyensec.com’ && permission === 'openExternal') {
		return callback(false) 
    } else {
		return callback(true) 
   	}
});
```

#### 12 - insertCSS, executeJavaScript or eval 

Check whether *insertCSS*, *executeJavaScript* or *eval* functions are used. Manual review required to ensure that no user-supplied arguments are passed to these functions.

#### 13 - allowpopups

Check whether *allowpopups* is present in the [webview](https://electron.atom.io/docs/api/webview-tag/) tag.

```
<webview src=“https://doyensec.com/" allowpopups></webview>
```

#### 14 - setAsDefaultProtocolClient, registerStandardSchemes, registerServiceWorkerSchemes, registerFileProtocol, registerHttpProtocol, registerStringProtocol, registerBufferProtocol

Check whether custom protocol handlers are defined by the application using one of the following functions. Manual review required.

* setAsDefaultProtocolClient(protocol[, path, args])
* registerStandardSchemes(schemes[, options])
* registerServiceWorkerSchemes(schemes)
* registerFileProtocol(scheme, handler[, completion])
* registerHttpProtocol(scheme, handler[, completion])
* registerStringProtocol(scheme, handler[, completion])
* registerBufferProtocol(scheme, handler[, completion])

#### 15 - openExternal 

Check whether the *openExternal* function is used. Manual review required.

```
const {shell} = require('electron') 
shell.openExternal('file:///Applications/Calculator.app')
```

## Credits

Electronegativity was made possible thanks to the gracious contribution of [Claudio Merloni](https://github.com/p4p3r). Thanks P4p3r!

This tool is based on a [Doyensec](https://www.doyensec.com) sponsored research published at [Black Hat USA 2017](https://www.blackhat.com/us-17/briefings.html#electronegativity-a-study-of-electron-security).

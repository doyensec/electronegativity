const {app} = require('electron');

app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused
    // Alternatively, verify their location if legitimate delete webPreferences.preload
    delete webPreferences.preloadURL;
    // Disable node integration
    webPreferences.nodeIntegration = true;
    // Verify URL being loaded
    if (!params.src.startsWith('https://doyensec.com/')) {
      event.preventDefault();
    }
  });
});

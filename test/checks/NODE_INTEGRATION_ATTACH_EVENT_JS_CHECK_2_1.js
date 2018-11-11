const {app} = require('electron');

let something1;

app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused
    // Alternatively, verify their location if legitimate delete webPreferences.preload
    delete webPreferences.preloadURL;
    // Disable node integration
    if (something1)
      if (something1)
        if (something1)
          if (something1)
            if (something1)
              if (something1) // imitate deeply nested structure
                webPreferences.nodeIntegration = true;

    // Verify URL being loaded
    if (!params.src.startsWith('https://doyensec.com/')) {
      event.preventDefault();
    }
  });
});

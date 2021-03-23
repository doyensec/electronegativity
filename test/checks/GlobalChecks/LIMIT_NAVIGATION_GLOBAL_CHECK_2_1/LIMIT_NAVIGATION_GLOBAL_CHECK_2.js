var a = "1";

win.webContents.on('will-navigate', (event, newURL) => { /* eng-disable LIMIT_NAVIGATION_JS_CHECK */
  if (win.webContents.getURL() !== 'https://doyensec.com' ) {
    event.preventDefault();
  }
});
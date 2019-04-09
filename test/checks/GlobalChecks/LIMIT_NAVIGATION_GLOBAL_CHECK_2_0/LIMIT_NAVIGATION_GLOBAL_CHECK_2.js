win.webContents.on('will-navigate', (event, newURL) => {
  if (win.webContents.getURL() !== 'https://doyensec.com' ) {
    event.preventDefault();
  }
})
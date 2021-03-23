  console.log("Hello world!");

  // Prevent navigation outside of serve://boundary per
  // Electronegativity LIMIT_NAVIGATION_GLOBAL_CHECK
  mainWindow.webContents.on('will-navigate', (event, url) => { /* eng-disable LIMIT_NAVIGATION_GLOBAL_CHECK */
    if (!url.startsWith('serve://boundary')) event.preventDefault();
  });
  mainWindow.webContents.on('new-window', (event, url) => { /* eng-disable LIMIT_NAVIGATION_GLOBAL_CHECK */
    if (!url.startsWith('serve://boundary')) event.preventDefault();
  });
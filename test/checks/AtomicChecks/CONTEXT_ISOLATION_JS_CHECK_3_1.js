let test_preferences = {
  webPreferences: {
    contextIsolation: false,
  }
};

mainWindow = new BrowserWindow(test_preferences);

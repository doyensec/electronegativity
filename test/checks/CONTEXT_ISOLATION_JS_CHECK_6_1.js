let test_preferences = {
  webPreferences: {
    contextIsolation: false,
  }
};

mainWindow = new BrowserView(test_preferences);

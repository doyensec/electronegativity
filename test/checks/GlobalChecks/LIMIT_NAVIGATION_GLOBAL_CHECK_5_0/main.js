    this._window.webContents.setWindowOpenHandler((details) => {
      if (this.isAllowedInternalNavigationUrl(details.url)) {
        return { action: 'allow' };
      } else {
        this.tryExternalNavigation(details.url);
        return { action: 'deny' };
      }
    });
const { Tray } = require('electron');
const tray = new Tray('/path/to/my/icon');
tray.setHighlightMode('always');
const {shell} = require('electron');

let app = "Calculator.app";
shell.openExternal('file:///Applications/' + app);
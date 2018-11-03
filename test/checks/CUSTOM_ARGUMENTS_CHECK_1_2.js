const {app} = require('electron');
app.commandLine.appendArgument('debug');
app.commandLine.appendSwitch('proxy-server', '8080');
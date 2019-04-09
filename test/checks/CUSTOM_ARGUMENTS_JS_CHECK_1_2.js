const {app} = require('electron');
app.commandLine.appendArgument('inspect');
app.commandLine.appendArgument('disable-web-security');
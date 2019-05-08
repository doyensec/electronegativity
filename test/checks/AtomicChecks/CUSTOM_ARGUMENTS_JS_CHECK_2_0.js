const {app} = require('electron');
app.commandLine.appendSwitch('enable-features=GuestViewCrossProcessFrames');
app.commandLine.appendArgument('disable-http-cache');
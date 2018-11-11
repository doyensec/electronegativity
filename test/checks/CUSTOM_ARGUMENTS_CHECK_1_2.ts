import { app } from "electron";

export default function initialize() {

  app.commandLine.appendArgument('debug');
  app.commandLine.appendSwitch('proxy-server', '8080');
}

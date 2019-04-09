import { app } from "electron";

export default function initialize() {

  app.commandLine.appendArgument('inspect');
  app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');
}

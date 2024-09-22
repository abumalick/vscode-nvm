'use strict';
import * as vscode from 'vscode';

function use(x: vscode.Terminal) {
  var isWin = process.platform === "win32";
  if (isWin) {
    x.sendText(`nvm use $(Get-Content .nvmrc).replace( 'v', '' )`);
  }
  else {
    x.sendText('nvm use');
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-nvm" is now active!');

  const terminals = (<any>vscode.window).terminals;
  if (terminals.length) {
    // console.log("Found opened terminals, let's change node version");
    terminals.forEach(function switchNode(t: vscode.Terminal) {
      use(t);
    });
  }
  (<any>vscode.window).onDidOpenTerminal((e: vscode.Terminal) => {
    // console.log('Terminal opened: ');
    use(e);
  });
}

export function deactivate() { }

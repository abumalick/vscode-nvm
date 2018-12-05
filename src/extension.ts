'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-nvm" is now active!');

  const terminals = (<any>vscode.window).terminals;
  if (terminals.length) {
    // console.log("Found opened terminals, let's change node version");
    terminals.forEach(function switchNode(t: vscode.Terminal) {
      t.sendText('nvm use');
    });
  }
  (<any>vscode.window).onDidOpenTerminal((e: vscode.Terminal) => {
    // console.log('Terminal opened: ');
    e.sendText('nvm use');
  });
}

export function deactivate() {}

'use strict';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-nvm" is now active!');

  const getNvmrcCommand = () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) return 'nvm use';
    const nvmrcPath = path.join(folder.uri.fsPath, '.nvmrc');
    try {
      const version = fs.readFileSync(nvmrcPath, 'utf8').trim();
      return `nvm use ${version}`;
    } catch (err) {
      return 'nvm use';
    }
  };

  const command = getNvmrcCommand();

  const terminals = (<any>vscode.window).terminals;
  if (terminals.length) {
    // console.log("Found opened terminals, let's change node version");
    terminals.forEach(function switchNode(t: vscode.Terminal) {
      t.sendText(command);
    });
  }
  (<any>vscode.window).onDidOpenTerminal((e: vscode.Terminal) => {
    // console.log('Terminal opened: ');
    e.sendText(command);
  });
}

export function deactivate() {}

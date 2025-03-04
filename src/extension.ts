"use strict";
import * as vscode from "vscode";
import { readFileSync } from "fs";
import { join } from "path";

function readPkgJson() {
  if (vscode.workspace.workspaceFolders) {
    const firstFolder = vscode.workspace.workspaceFolders[0];
    const path = join(firstFolder.uri.path, "package.json");
    const content = readFileSync(path, "utf-8").replace("\n", "");
    const pkg = JSON.parse(content);
    return pkg && pkg.engines && pkg.engines.node;
  }
  return null;
}

function readNvmRc() {
  if (vscode.workspace.workspaceFolders) {
    const firstFolder = vscode.workspace.workspaceFolders[0];
    const path = join(firstFolder.uri.path, ".nvmrc");
    const content = readFileSync(path, "utf-8").replace("\n", "");
    return content;
  }
  return null;
}

function getNodeVersion() {
  return readPkgJson() || readNvmRc();
}

export function activate(context: vscode.ExtensionContext) {
  let version = getNodeVersion();
  console.log(`Detected repository node version: ${version}`);

  const terminals = (<any>vscode.window).terminals;
  if (terminals.length) {
    terminals.forEach(function switchNode(t: vscode.Terminal) {
      t.sendText(`nvm use ${version}`);
    });
  }
  (<any>vscode.window).onDidOpenTerminal((e: vscode.Terminal) => {
    e.sendText(`nvm use ${version}`);
  });
}

export function deactivate() {}

# vscode-nvm README

Vscode plugin that use nvm to switch node version according to `.nvmrc` file

## Features

This is a work in progress, it is only tested in macOS at the moment

- [x] launch `nvm use` command in integrated terminals to automatically change node version
- [ ] launch scripts with the correct node version
- [ ] launch debugger with the correct node version

## Requirements

- [nvm](https://github.com/creationix/nvm) must be installed on your system
- you should have a `.nvmrc` file in root folder of the project
- install manually the version referred in `.nvmrc` with `nvm install`

## Configuration

### Example of `.nvmrc` file

```
v10.14.0
```

## Known Issues

No issue known ATM

## Release Notes

### 0.0.1

Initial release of vscode-nvm

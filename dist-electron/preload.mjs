"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Define your IPC methods here
  ping: () => electron.ipcRenderer.invoke("ping")
});

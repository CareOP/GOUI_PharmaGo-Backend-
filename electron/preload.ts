import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Define your IPC methods here
  ping: () => ipcRenderer.invoke('ping'),
});
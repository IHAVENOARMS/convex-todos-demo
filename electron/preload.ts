import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipc", {
  ping: () => ipcRenderer.invoke("ping"),
  zoomIn: () => ipcRenderer.invoke("zoom-in"),
  zoomOut: () => ipcRenderer.invoke("zoom-out"),
});

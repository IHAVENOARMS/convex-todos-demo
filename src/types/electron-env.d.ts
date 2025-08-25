type IPC = {
  ping: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

interface Window {
  ipc: IPC | undefined;
}

interface ElectronWindow extends Window {
  ipc: IPC;
}

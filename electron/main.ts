import { ipcMain, app, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: "Main window",
    autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, "./preload.mjs") },
  });

  win.removeMenu();
  win.webContents.setZoomFactor(1.0);

  // Upper Limit is working of 500 %
  win.webContents.setVisualZoomLevelLimits(1, 5);

  function zoomIn() {
    const currentZoom = win.webContents.getZoomFactor();
    win.webContents.zoomFactor = currentZoom + 0.2;
  }
  function zoomOut() {
    const currentZoom = win.webContents.getZoomFactor();
    win.webContents.zoomFactor = currentZoom - 0.2;
  }

  win.webContents.on("zoom-changed", (event, zoomDirection) => {
    if (zoomDirection === "in") {
      zoomIn();
    }
    if (zoomDirection === "out") {
      zoomOut();
    }
  });

  ipcMain.handle("ping", () => console.log("pong"));
  ipcMain.handle("zoom-in", () => zoomIn());
  ipcMain.handle("zoom-out", () => zoomOut());

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    win.loadFile("dist/index.html");
  }
});

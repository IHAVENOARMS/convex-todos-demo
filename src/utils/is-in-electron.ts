export const isInElectron = (
  window: Window | ElectronWindow,
): window is ElectronWindow => {
  return typeof window.ipc !== "undefined";
};

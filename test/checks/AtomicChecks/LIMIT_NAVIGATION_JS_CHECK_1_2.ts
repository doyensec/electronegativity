export const create: CreateBrowserWindow = ({ isDev, options }) => {
  newWindow.webContents.on("will-navigate", event => event.preventDefault());
  newWindow.webContents.on("new-window", event => event.preventDefault());
  return newWindow;
};

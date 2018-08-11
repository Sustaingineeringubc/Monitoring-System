
// Modules
const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')

ipcMain.on('app-loaded', (e, itemURL) => {
  mainWindow.loadPage('login.html')
})

let windows = {};

// Enable Electron-Reload
//require('electron-reload')(__dirname)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindow.createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow !== null) { return }
})

var createWindow = (window) => {
  switch(window) {
    case 'main':
      let mainWindow = new BrowserWindows({
        width: 1000, 
        height: 800, 
        minWidth: 920, 
        minHeight: 730
      })
      windows.mainWindow = mainWindow;
      mainWindow.createWindow(mainWindow);
      break;
    case 'monitor':
      break;
    case 'user_menu':
      break;
  }
}
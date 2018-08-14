
// Modules
const {app, BrowserWindow, ipcMain} = require('electron');
const mainWindow = require('./mainWindow');
const monitorWindow = require('./monitorWindow.js');
const datastore = require('./datastore');

var checkActiveSession = async function(currentWin) {
  await datastore.expireSessions();
  let activeSession = await datastore.restoreSession();
  if (!activeSession) {
    return false
  }
  createWindow('monitor');
  return true
}


let windows = {};

// Enable Electron-Reload
//require('electron-reload')(__dirname)

app.on('ready', async () => {
    createWindow('main')
    let activeSession = await checkActiveSession(windows.mainWindow)
    if (!activeSession) {
      setTimeout(() => {
      mainWindow.loadPage('login.html')
      }, 3000)
    }
});

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

function createWindow(window) {
  switch(window) {
    case 'main':
      let mainBrowserWindow = new BrowserWindow({
        width: 1000, 
        height: 800, 
        minWidth: 920, 
        minHeight: 730
      })
      windows.mainWindow = mainBrowserWindow;
      mainWindow.createWindow(mainBrowserWindow)
      break;
    case 'monitor':
      let monitorBrowserWindow = new BrowserWindow({
        width: 1000, 
        height: 800, 
        minWidth: 920, 
        minHeight: 730
      })
      windows.monitorWindow = monitorBrowserWindow;
      monitorWindow.createWindow(monitorBrowserWindow);
      windows.mainWindow.close()
      break;
  }
}


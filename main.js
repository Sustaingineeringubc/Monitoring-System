
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

ipcMain.on('log-in', async (e, msg) => {
  try {
    let isLoggedIn = await datastore.loginUser(msg.email, msg.password, msg.isRemembered)
    if (!isLoggedIn) {
      e.sender.send('log-in', {error:"User already exists"})
      return
    }
    createWindow('monitor');
  } catch(error) {
    console.log('error', error)
    e.sender.send('is-new-user', false)
  } 
})

ipcMain.on('log-out', async (e, msg) => {
  try{
    await datastore.logOut()
    windows.monitorWindow.close();
    windows.monitorWindow = null;
    createWindow('main', 'login.html')
  } catch(error) {
    console.log(error);
  }
})

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

function createWindow(window, filename) {
  switch(window) {
    case 'main':
      let mainBrowserWindow = new BrowserWindow({
        width: 1000, 
        height: 800, 
        minWidth: 920, 
        minHeight: 730
      })
      windows.mainWindow = mainBrowserWindow;
      mainWindow.createWindow(mainBrowserWindow, filename)
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
      windows.mainWindow.close();
      windows.mainWindow = null;
      break;
  }
}


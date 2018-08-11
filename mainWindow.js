
// Modules

const {BrowserWindow, ipcMain} = require('electron')
const datastore = require('./datastore.js')
const filewatch = require('./datasource/filewatch');
var loadingState = "Kicking off engines."

exports.win
ipcMain.on('loading-state', (e, msg) => {
  e.sender.send('loading-state', loadingState)
})


// mainWindow createWindow fn
exports.createWindow = (mainWindow) => {

  this.win = mainWindow

  // Create full size app
  //this.win.maximize();

  // Devtools
  //this.win.webContents.openDevTools()

  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  this.win.once('ready-to-show', async () => {
    this.win.show()
    loadingState = "Initializing Local Datastore.."
    await datastore.initializeDataStore()
    loadingState = "Local Datastore initialized.."
    return true;
   // updateLoadingState('Initializing datastore')
  })  
  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
  return this.win;
}


var loadPage = exports.loadPage = (name) => {
  if (name === 'monitor.html') {
    this.win.loadURL('file://' + __dirname + '/renderer/monitor.html')

  }  else{
    this.win.loadURL(`file://${__dirname}/renderer/${name}`)
  }

}

ipcMain.on('is-new-user', async (e, msg) => {
  try {
    let isOldUser = await datastore.findUser(msg.email)
    if (isOldUser) {
      e.sender.send('is-new-user', {error:"User already exists"})
      return
    }
    await datastore.newUser(msg.email, msg.password)
    loadPage('login.html')
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})

ipcMain.on('log-in', async (e, msg) => {
  try {
    let isLoggedIn = await datastore.loginUser(msg.email, msg.password, msg.isRemembered)
    if (!isLoggedIn) {
      e.sender.send('log-in', {error:"User already exists"})
      return
    }
    //TODO:
    let win = new BrowserWindow({width: 1000, height: 800, minWidth: 920, minHeight: 730})
    win.loadURL(`file://${__dirname}/renderer/monitor.html`)
    win.webContents.openDevTools()
    this.win.close()
    this.win = win

  } catch(error) {
    console.log('error', error)
    e.sender.send('is-new-user', false)
  } 
})



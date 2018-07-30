
// Modules

const {BrowserWindow, ipcMain} = require('electron')
const datastore = require('./datastore.js')
// BrowserWindow instance

var loadingState = "Kicking off engines."


exports.win
ipcMain.on('loading-state', (e, msg) => {
  e.sender.send('loading-state', loadingState)
})
// mainWindow createWindow fn
exports.createWindow = () => {


  this.win = new BrowserWindow({
    height: 700,
    width: 900,
    show: false
  })


  //this.win.maximize();

  // Devtools
  //this.win.webContents.openDevTools()

  // Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  this.win.once('ready-to-show', async () => {
    this.win.show()
    loadingState = "Initializing Local Datastore.."
    await datastore.initializeDataStore()
    loadingState = "Local Datastore initialized.."
   // updateLoadingState('Initializing datastore')
  })  
  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
}


exports.loadPage = (name) => {
  this.win.loadURL(`file://${__dirname}/renderer/${name}`)
}


// Modules

const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');
const filewatch = require('./datasource/filewatch');
var loadingState = "Kicking off engines."

exports.win
ipcMain.on('loading-state', (e, msg) => {
  e.sender.send('loading-state', loadingState)
})


// mainWindow createWindow fn
exports.createWindow = (mainWindow, fileName) => {
  this.win = mainWindow
  // Create full size app
  //this.win.maximize();
  if (fileName ) {   this.win.loadURL(`file://${__dirname}/renderer/${fileName}`) }
  else { this.win.loadURL(`file://${__dirname}/renderer/main.html`) }
  // Devtools
  //this.win.webContents.openDevTools()


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



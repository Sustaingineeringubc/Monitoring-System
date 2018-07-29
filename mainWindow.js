
// Modules
const {BrowserWindow} = require('electron')
const datastore = require('./datastore.js')
// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    height: 700,
    width: 900,
    show: false
  })


  //this.win.maximize();

  // Devtools
  this.win.webContents.openDevTools()

  // Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  this.win.once('ready-to-show', () => {
    this.win.show()
    datastore.initializeDataStore()

  })  
  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
}

  exports.loadPage = (name) => {
    this.win.loadURL(`file://${__dirname}/renderer/${name}`)
  }

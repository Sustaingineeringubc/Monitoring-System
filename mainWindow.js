
// Modules
const {BrowserWindow} = require('electron')

// BrowserWindow instance
exports.win

// mainWindow createWindow fn
exports.createWindow = () => {

  this.win = new BrowserWindow({
    height: 700,
    width: 900
  })

  this.win.maximize();

  exports.loadPage = (name) => {
    console.log(`file://${__dirname}/renderer/${name}`)
    this.win.loadURL(`file://${__dirname}/renderer/${name}`)
  }

  // Devtools
  //this.win.webContents.openDevTools()

  // Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`)

  // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })
}

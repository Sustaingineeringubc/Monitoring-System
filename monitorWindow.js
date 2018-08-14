
// Modules

const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');
const filewatch = require('./datasource/filewatch');

exports.win

exports.createWindow = (monitorWindow) => {
  this.win = monitorWindow;

  this.win.loadURL(`file://${__dirname}/renderer/monitor.html`);


  // Create full size app
  this.win.maximize();

  // Devtools
  this.win.webContents.openDevTools()

  this.win.once('ready-to-show', async () => {
    this.win.show()
  })  

  this.win.once('move', async () => {
    //Monitor window moved
  }) 
    // Handle window closed
  this.win.on('closed', () => {
    this.win = null
  })

  this.win.on('focus', () => {
    //Focused on monitor window
  })

  return this.win;
}
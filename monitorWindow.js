
// Modules

const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');
const filewatch = require('./datasource/filewatch');
const userMenu = require('./userMenuWindow');

let childWindows = {};

exports.win

exports.createWindow = (monitorWindow) => {
    console.log('create windows')
    this.win = monitorWindow;

    this.win.loadURL(`file://${__dirname}/renderer/monitor.html`);


    // Create full size app
    this.win.maximize();

    // Devtools
    //this.win.webContents.openDevTools()

    this.win.once('ready-to-show', async () => {
        this.win.show()
    })  

    this.win.once('move', async () => {
      console.log('move')
    }) 
      // Handle window closed
      this.win.on('closed', () => {
        this.win = null
      })

      this.win.on('focus', () => {
        let childWindows = this.win.getChildWindows()
        if (childWindows[0].isVisible()){
          console.log('c',childWindows)
          childWindows[0].hide()
        }
      })

    return this.win;
}

var createUserMenu = exports.createUserMenu  = function() {
  let userMenuBrowserWindow = new BrowserWindow({
    width: 200, 
    height: 250,
    parent: windows.monitorWindow,
    resizable: false,
    frame: false,
    x: 90,
    y: 80,
    alwaysOnTop: true
  })
  childWindows.userMenu = userMenuBrowserWindow;
  userMenu.createWindow(userMenuBrowserWindow);
}
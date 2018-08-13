const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');

exports.createWindow = (userMenuWindow) => {

    this.win = userMenuWindow;

    this.win.loadURL(`file://${__dirname}/renderer/userMenu.html`);

    // Devtools
    //this.win.webContents.openDevTools()

    this.win.once('ready-to-show', async () => {
        this.win.show()
      })  
      // Handle window closed
      this.win.on('closed', () => {
        this.win = null
      })

    return this.win;
}
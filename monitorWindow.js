
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

ipcMain.on('is-new-user', async (e, msg) => {
  try {
    let isOldUser = await datastore.findUser(msg.email)
    if (isOldUser) {
      e.sender.send('is-new-user', { error:"User already exists" })
      return
    }
    await datastore.newUser(msg.email, msg.password)
    loadPage('login.html')
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})

ipcMain.on('get-history', async (e, msg) => {
  try {
    console.log('data', msg)  
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})
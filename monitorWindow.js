
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

// [ Triggers ]

ipcMain.on('get-history', async (e, msg) => {
  try {
    let from  = msg.data.from
    let to = msg.data.to
    let unixFrom = parseInt((new Date(from).getTime() / 1000).toFixed())
    let unixTo = parseInt((new Date(to).getTime() / 1000).toFixed())
    let data = await datastore.getHistoryData({from: unixFrom, to: unixTo, pumpId: msg.data.pumpId})
    e.sender.send('get-history', {data: data})
  } catch(error) {
    e.sender.send('get-history', false)
  }
})
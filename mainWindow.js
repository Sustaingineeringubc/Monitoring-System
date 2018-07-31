
// Modules

const {BrowserWindow, ipcMain} = require('electron')
const datastore = require('./datastore.js')
const csvReader = require('./datasource/csvReader')
const fs = require('fs');

// BrowserWindow instance
var startByte = 0;
var initiatedRead = false;
var lastRead = null;
var lastUpdate = null;
var isDataUpdated = false

try {
  fs.watchFile('test-csv.csv', (curr, prev) => {
    fs.stat('test-csv.csv', (err, stats) => {
      if (err) throw err;
      fs.createReadStream('test-csv.csv', {
        start: startByte,
        end: stats.size
      })
        .pipe(csv({headers : false}))
        .on('data', data => {
          startByte = stats.size;
          if (data.length === 0) {
            return
          }
          if (!initiatedRead) {
            lastRead = {
              voltage: data[0],
              current: data[1],
              power: data[2],
              opTemp: data[3],
              suTemp: data[4],
              waterBreaker: data[5],
              pumpId: data[6]
            }
            return
          }
          var dataObject = {
            voltage: data[0],
            current: data[1],
            power: data[2],
            opTemp: data[3],
            suTemp: data[4],
            waterBreaker: data[5],
            pumpId: data[6]
          }
          lastUpdate = dataObject
          isDataUpdated = false
        })		
        .on('end', data => {
          if (!initiatedRead) {
            lastUpdate = lastRead;
            isDataUpdated = false
            initiatedRead = true
            return
          }
      })
    })
  })
} catch(error) {
  console.log(error)
}



var loadingState = "Kicking off engines."



exports.win
ipcMain.on('loading-state', (e, msg) => {
  e.sender.send('loading-state', loadingState)
})

ipcMain.on('is-data-updated', (e, msg) => {
  try {
   if (isDataUpdated) {
    return
   }
   isDataUpdated = true
   e.sender.send('is-data-updated', {data: lastUpdate})
  } catch(error) {
    e.sender.send('is-data-updated', false)
  }
})

ipcMain.on('is-new-user', async (e, msg) => {
  try {
    let isOldUser = await datastore.findUser(msg.email)
    if (isOldUser) {
      e.sender.send('is-new-user', {error:"User already exists"})
      return
    }
    await datastore.newUser(msg.email, msg.password)
    let win = new BrowserWindow({width: 800, height: 600})
    win.loadURL(`file://${__dirname}/renderer/monitor.html`)
    this.win.close()
    this.win = win

  } catch(error) {
    console.log('error', error)
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
    let win = new BrowserWindow({width: 800, height: 600})
    win.loadURL(`file://${__dirname}/renderer/monitor.html`)
    win.webContents.openDevTools()
    this.win.close()
    this.win = win

  } catch(error) {
    console.log('error', error)
    e.sender.send('is-new-user', false)
  }
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
  this.win.webContents.openDevTools()

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


var loadPage = exports.loadPage = (name) => {
  if (name === 'monitor.html') {
    this.win.loadURL('file://' + __dirname + '/renderer/monitor.html')

  }  else{
    this.win.loadURL(`file://${__dirname}/renderer/${name}`)
  }

}

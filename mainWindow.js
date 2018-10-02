
// Modules

const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');
const filewatch = require('./datasource/filewatch');
var loadingState = "Kicking off engines."
//User Email
var userEmail = ""

exports.win

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

// [ Triggers ]

ipcMain.on('loading-state', (e, msg) => {
  e.sender.send('loading-state', loadingState)
})

ipcMain.on('is-new-user', async (e, msg) => {
  try {
    let isOldUser = await datastore.findUser(msg.email)
    if (isOldUser) {
      e.sender.send('is-new-user', {error:"User already exists"})
      return
    }
    await datastore.newUser(msg)
    loadPage('login.html')
  } catch(error) {
    e.sender.send('is-new-user', false)
  }
})

//Verify email
ipcMain.on('email-exists', async (e, msg) => {
  try {
    let emailExists = await datastore.findUser(msg.email)
    if (!emailExists) {
      e.sender.send('email-exists', {error:"Email does not exist"})
      return
    }
    userEmail = msg.email
    loadPage('resetPassword.html')
  } catch(error) {
    e.sender.send('email-exists', false)
  }
})

//Reset Password
ipcMain.on('new-password', async (e, msg) => {
  try {
    //Save new password to the mapped email
    await datastore.newPassword({email: userEmail, password: msg.password})
    e.sender.send('new-password', false)
    loadPage('login.html')
  } catch(error) {
    e.sender.send('new-password', false)
  }
})
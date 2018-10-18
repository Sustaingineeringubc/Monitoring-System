
// Modules

const {BrowserWindow, ipcMain} = require('electron');
const datastore = require('./datastore.js');
const filewatch = require('./datasource/filewatch');

//Node Emailer variables
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'horus.sustaingineering@gmail.com',
    pass: 'horus4ever!'
  }
});

var loadingState = "Kicking off engines."
//User Email
var userEmail = ""
//Verification Code
var verificationCode = ""

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
    let randomCode = Math.random().toString(36).substring(7);
    const mailOptions = {
      from: 'horus.sustaingineering@gmail.com',
      to: userEmail,
      subject: 'Reset your Password Verification Code',
      html: `
      <p>
      Hi,
        This is your temporary verification code: ` + randomCode + `
      </p>
      `,
    };
    verificationCode = randomCode
    await transporter.sendMail(mailOptions, function (error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
    loadPage('verifyCode.html')
  } catch(error) {
    e.sender.send('email-exists', false)
  }
})

//Reset Password
ipcMain.on('new-password', async (e, msg) => {
  try {
    //Save new password to the mapped email
    await datastore.newPassword({email: userEmail, password: msg.password})
    e.sender.send('new-password', {success: 'Password successfully changed!'})
    loadPage('login.html')
  } catch(error) {
    e.sender.send('new-password', false)
  }
})

//VerifyCode
ipcMain.on('verify-code', async (e, msg) => {
  try {
    //Save new password to the mapped email
    if(!(msg.code === verificationCode)) {
      e.sender.send('verify-code', {error: 'Wrong Verification Code entered'})
      return
    }
    verificationCode = ""
    loadPage('resetPassword.html')
  } catch(error) {
    e.sender.send('verify-code', false)
  }
})
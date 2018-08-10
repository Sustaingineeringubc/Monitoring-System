
// Modules

const {BrowserWindow, ipcMain} = require('electron')
const datastore = require('./datastore.js')
const filewatch = require('./datasource/filewatch');
var loadingState = "Kicking off engines."

exports.win

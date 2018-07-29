// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log('loaded app js')

const {ipcRenderer} = require('electron')



function loadApp() {
  setTimeout(function(){ 
    console.log('time')
    ipcRenderer.send('app-loaded', 'true') 

    }, 3000);
}

loadApp()

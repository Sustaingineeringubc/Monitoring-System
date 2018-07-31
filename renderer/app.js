// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

$ = require('jquery');


const {ipcRenderer} = require('electron')




function loadApp() {
  setTimeout(() => {
  //  fecthState(5)
  }, 2000)
  setTimeout(function(){ 
    ipcRenderer.send('app-loaded', 'true') 
    $('#loading-label').text('text changed')
    }, 5000);
}

ipcRenderer.on('loading-state', (e, state) => {
  $('#loading-label').text(state);
})

function fecthState(count) {
  if (count === 1) {
    return
  }
  setTimeout(() => {
    ipcRenderer.send('loading-state', 'true') 
    fecthState(count - 1)
  }, 1000)
}

loadApp()

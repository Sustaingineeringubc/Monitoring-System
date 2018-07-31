const {ipcRenderer} = require('electron')

$('#signup-button').click(() => {
    let password = $('#password').val();
    let email = $('#email').val();
    
    if (!email || !password) {
        return
    }

  ipcRenderer.send('is-new-user', {password, email})   
  })

  ipcRenderer.on('is-new-user', (e, msg) => {
    if (msg.error) {
        alert( msg.error)
    }
  })
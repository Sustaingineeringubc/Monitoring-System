const {ipcRenderer} = require('electron')

$('#login-button').click(() => {
    
    let password = $('#password').val();
    let email = $('#email').val();
    let isRemembered = $('#remember').val();

    if (!email || !password || !isRemembered) {
        return
    }

    ipcRenderer.send('log-in', {password, email, isRemembered}) 
  
  })

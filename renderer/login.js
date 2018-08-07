const {ipcRenderer} = require('electron')

$('#login-button').click(() => {
    
    let password = $('#password').val();
    let email = $('#email').val();
    let isRemembered = $('#remember').prop('checked');
    if (!email || !password) {
        return
    }
    ipcRenderer.send('log-in', {password, email, isRemembered}) 
  
  })

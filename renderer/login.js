const {ipcRenderer} = require('electron')

$('#login-button').click(() => {
    
    let password = $('#password').val();
    let email = $('#email').val();
    let isRemembered = $('#remember').prop('checked');
    console.log(password, email, isRemembered);
    if (!email || !password) {
        return
    }
    console.log('sedning')
    ipcRenderer.send('log-in', {password, email, isRemembered}) 
  
  })

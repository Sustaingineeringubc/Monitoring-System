const {ipcRenderer} = require('electron')


$('#login-button').click(() => {
    let password = $('#password').val();
    let email = $('#email').val();
    if (!email || !password) {
        return
    }

    // Get URL from input
  
  })
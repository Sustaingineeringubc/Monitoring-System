const {ipcRenderer} = require('electron')


$('#login-button').click(() => {
    let password = $('#password').val();
    let email = $('#email').val();
    if (!email || !password) {
        return
    }

    ipcRenderer.send('is-new-user', {password, email}) 


    // Get URL from input
  
  })
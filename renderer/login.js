const {ipcRenderer} = require('electron')


console.log('iniiit')

$('#login-button').click(() => {
    let password = $('#password').val();
    let email = $('#email').val();
    
    if (!email || !password) {
        return
    }

   // ipcRenderer.send('log-in', {password, email}) 


    // Get URL from input
  
  })

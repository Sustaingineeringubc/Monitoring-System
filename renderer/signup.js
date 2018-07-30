const {ipcRenderer} = require('electron')


console.log('iniiitfff')

$('#signup-button').click(() => {
    console.log('click')
    let password = $('#password').val();
    let email = $('#email').val();
    
    if (!email || !password) {
        return
    }

  ipcRenderer.send('is-new-user', {password, email}) 
    console.log('click')


    // Get URL from input
  
  })

  ipcRenderer.on('is-new-user', (e, msg) => {
    if (msg.error) {
        alert( msg.error)
    }
  })
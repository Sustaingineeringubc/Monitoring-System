const {ipcRenderer} = require('electron')


$('#login-button').click(() => {
    console.log('triggered')
    let password = $('#password').val();
    let email = $('#email').val();
    if (!email || !password) {
        return
    }
    alert("Hello! I am an alert box!!"+email);

    // Get URL from input
  
    console.log(email);
  })
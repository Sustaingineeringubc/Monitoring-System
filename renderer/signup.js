const {ipcRenderer} = require('electron')

$('#signup-button').click(() => {
    let password = $('#password').val();
    let email = $('#email').val();
    let username = $('#username').val();
    let organization = $('#organization').val();

    if (!email || !password || !username || !organization) {
        emailCheckEmpty(email);
        passwordCheckEmpty(password);
        usernameCheckEmpty(username);
        organizationCheckEmpty(organization);
        return
    }
    ipcRenderer.send('is-new-user', {password, email, username, organization})   
})

var organizationCheckEmpty =  function(username)  {
    if(!organization) {
        $('#organization').addClass("is-danger");
        $('#organization').removeClass("is-primary");
    } else {
        $('#organization').addClass("is-primary");
        $('#organization').removeClass("is-danger");
    }
}

var usernameCheckEmpty =  function(username)  {
    if(!username) {
        $('#username').addClass("is-danger");
        $('#username').removeClass("is-primary");
    } else {
        $('#username').addClass("is-primary");
        $('#username').removeClass("is-danger");
    }
}

var emailCheckEmpty = function (email) {
    if(!email) {
        $('#email').addClass("is-danger");
        $('#email').removeClass("is-primary");
        $('#emailCheckbox').addClass("hidden");
    } else {
        $('#email').addClass("is-primary");
        $('#email').removeClass("is-danger");
        $('#emailCheckbox').removeClass("hidden");
    }
}

var passwordCheckEmpty = function (password) {
    if(!password) {
        $('#password').addClass("is-danger");
        $('#password').removeClass("is-primary");
    } else {
        $('#password').removeClass("is-danger");
        $('#password').addClass("is-primary");
    }
}

ipcRenderer.on('is-new-user', (e, msg) => {
if (msg.error) {
    alert( msg.error)
}
})

var signupTitle = $("#signupTitle");
var signupSubtitle = $("#signupSubtitle");
var box = $("#box");
signupTitle.slideToggle("slow");
signupSubtitle.slideToggle("slow");
box.slideToggle("slow");
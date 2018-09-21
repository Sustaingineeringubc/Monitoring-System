const {ipcRenderer} = require('electron')

// Login Validation
$('#login-button').click(() => {
    SendForm()
});

// Enter-Key Functionality
$("#email, #password").keypress(function(event) {
    SendForm(event) 
})

ipcRenderer.on('log-in', (e, msg) => {
    if (msg.error) { return alert(msg.error)}
})

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

// var loginBox = $("#loginBox");
// loginBox.show("2000");

var loginTitle = $("#loginTitle");
var loginSubtitle = $("#loginSubtitle");
var box = $("#box");
loginTitle.slideToggle("slow");
loginSubtitle.slideToggle("slow");
box.slideToggle("slow");

function SendForm(event) {
    if(event){
        var key = event.which;
        if (key !== 13){
            return
        }
    }

    let password = $('#password').val();
    let email = $('#email').val();

    // Looses focus effect when signup button is pressed
    $('#email').blur();
    $('#password').blur();

    if (!email || !password || !username || !organization) {
        emailCheckEmpty(email);
        passwordCheckEmpty(password);
        return
    }
    //Email validation
    if(email) {
        var validator = require("email-validator");
        if(!validator.validate(email)) {
            //error
            $('#email').addClass("is-danger");
            $('#email').removeClass("is-primary");
            $('#emailCheckbox').addClass("hidden");
            alert('Enter valid email address')
            return
        } 
    }
    ipcRenderer.send('is-new-user', {password, email, username, organization}) 
}
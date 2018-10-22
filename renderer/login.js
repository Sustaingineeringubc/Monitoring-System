const {ipcRenderer} = require('electron')

// Login Validation
$('#login-button').click(() => {
    SendForm()
});

// Enter-Key Functionality
$("#user, #password").keypress(function(event) {
    SendForm(event) 
})

ipcRenderer.on('log-in', (e, msg) => {
    if (msg.error) { return alert(msg.error)}
})

var userCheckEmpty = function (user) {
    if(!user) {
        $('#user').addClass("is-danger");
        $('#user').removeClass("is-primary");
        $('#userCheckbox').addClass("hidden");
    } else {
        $('#user').addClass("is-primary");
        $('#user').removeClass("is-danger");
        $('#userCheckbox').removeClass("hidden");
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
    let user = $('#user').val();
    let isRemembered = $('#remember').prop('checked');

    // Looses focus effect when signup button is pressed
    $('#user').blur();
    $('#password').blur();

    if (!user || !password) {
        userCheckEmpty(user);
        passwordCheckEmpty(password);
        return
    }
    ipcRenderer.send('log-in', {password, user, isRemembered}) 
}
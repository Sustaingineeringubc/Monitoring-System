const {ipcRenderer} = require('electron')

// Verify Email
$('#resetPassword-button').click(() => {
    SendForm()
});

// Enter-Key Functionality
$("#password").keypress(function(event) {
    SendForm(event) 
})

var passwordCheckEmpty = function (password) {
    if(!password) {
        $('#password').addClass("is-danger");
        $('#password').removeClass("is-primary");
    } else {
        $('#password').removeClass("is-danger");
        $('#password').addClass("is-primary");
    }
}

ipcRenderer.on('new-password', (e, msg) => {
    if (msg.error) {
        alert(msg.error)
    }
    else {
        alert('Password successfully changed!')
    }
})

var resetPasswordTitle = $("#resetPasswordTitle");
var resetPasswordSubtitle = $("#resetPasswordSubtitle");
var box = $("#box");
resetPasswordTitle.slideToggle("slow");
resetPasswordSubtitle.slideToggle("slow");
box.slideToggle("slow");

function SendForm(event) {
    if(event){
        var key = event.which;
        if (key !== 13){
            return
        }
    }

    let password = $('#password').val();

    // Looses focus effect when button is pressed
    $('#password').blur();

    if (!password) {
        passwordCheckEmpty(password);
        return
    }

    ipcRenderer.send('new-password', {password}) 
}
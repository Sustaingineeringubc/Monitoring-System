const {ipcRenderer} = require('electron')

// Verify Email
$('#verifyEmail-button').click(() => {
    SendForm()
});

// Enter-Key Functionality
$("#email").keypress(function(event) {
    SendForm(event) 
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

ipcRenderer.on('email-exists', (e, msg) => {
    if (msg.error) {
        alert(msg.error)
    }
})

var verifyEmailTitle = $("#verifyEmailTitle");
var verifyEmailSubtitle = $("#verifyEmailSubtitle");
var box = $("#box");
verifyEmailTitle.slideToggle("slow");
verifyEmailSubtitle.slideToggle("slow");
box.slideToggle("slow");

function SendForm(event) {
    if(event){
        var key = event.which;
        if (key !== 13){
            return
        }
    }

    let email = $('#email').val();
    let isRemembered = $('#remember').prop('checked');

    // Looses focus effect when button is pressed
    $('#email').blur();

    if (!email) {
        emailCheckEmpty(email);
        return
    }

    ipcRenderer.send('email-exists', {email, isRemembered}) 
}
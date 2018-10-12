const {ipcRenderer} = require('electron')

// Verify Email
$('#verifyCode-button').click(() => {
    SendForm()
});

// Enter-Key Functionality
$("#code").keypress(function(event) {
    SendForm(event) 
})

var codeCheckEmpty = function (code) {
    if(!code) {
        $('#code').addClass("is-danger");
        $('#code').removeClass("is-primary");
    } else {
        $('#code').addClass("is-primary");
        $('#code').removeClass("is-danger");
    }
}

ipcRenderer.on('verify-code', (e, msg) => {
    if (msg.error) {
        alert(msg.error)
    }
})

var verifyCodeTitle = $("#verifyCodeTitle");
var verifyCodeSubtitle = $("#verifyCodeSubtitle");
var box = $("#box");
verifyCodeTitle.slideToggle("slow");
verifyCodeSubtitle.slideToggle("slow");
box.slideToggle("slow");

function SendForm(event) {
    if(event){
        var key = event.which;
        if (key !== 13){
            return
        }
    }

    let code = $('#code').val();

    // Looses focus effect when button is pressed
    $('#code').blur();

    if (!code) {
        codeCheckEmpty(code);
        return
    }

    ipcRenderer.send('verify-code', {code}) 
}
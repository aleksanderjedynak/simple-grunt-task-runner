var APP = APP || {};

APP.init = function() {

    this.mainModule.init();

};

APP.mainModule = {

    showMessage: function(msg) {

        var output = document.querySelector("#messageBox");

        output.textContent = msg;

    },

    init: function() {

        try {
            this.showMessage("Witaj świecie!");
        } catch(e) {
            console.log(e);
        }

    }

};
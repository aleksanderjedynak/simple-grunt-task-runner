if(!APP) throw new Error("APP is required to run this module!");

APP.ajaxModule = {

    sendRequest: function(data) {

        this.prepareXHR();
        this.XHR.send(data);

    },

    prepareXHR: function() {

        this.XHR = new XMLHttpRequest();
        this.XHR.open("POST", "http://example.com", true);

    }

};

require('./Config.js');

$.ns('c360.server');

c360.server = {

    getJSON: function(url, data, callback ,type) {
        $.ajax({
            url: url,
            type: type == "GET" ? type : "POST",
            dataType: type == "GET" ? "JSONP" : "JSON",
            data: data,//JSON.stringify(data),
            contentType:"application/x-www-form-urlencoded",//"application/json",
            cache: false
        }).done(function(req){
            if(req.status == 420){

            }else{
                callback(req);
            }
        }).fail(function(req) {
            if(req.status == 420){

            }else{
                callback(req);
            }
        });
    },

    jsonpInterface:function(api , json , callback, type){
        c360.server.getJSON(c360.config.jsonpRoot + api, json , callback , type);
    },

    mainInterface:function(api , json , callback, type){
        c360.server.getJSON(c360.config.mainRoot + api, json , callback , type);
    },

    excelInterface:function(root , json){
        return root + "/?value=" + window.base64encode(utf16to8(JSON.stringify(json)));
    }

};
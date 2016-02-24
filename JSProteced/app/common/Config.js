$.ns('c360.config');

var httpUrl = window.location.href.indexOf("https") != -1?'https://':'http://';
var host = location.host;

var jsonpRoot = "pgchannel.camera360.com/";

if(window.location.host.indexOf("localhost") >=0||window.location.host.indexOf("10") >=0||window.location.host.indexOf("192") >=0){
    //jsonpRoot = "10.1.7.125:3000/";
    jsonpRoot = location.host+"/";
    //jsonpRoot = "pgchannel.camera360.com/";
}

c360.config = {

    mainRoot:httpUrl+window.location.host+'/',

    jsonpRoot:httpUrl+jsonpRoot,

    httpRoot:httpUrl
}
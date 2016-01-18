$.ns('c360.config');

var httpUrl = window.location.href.indexOf("https") != -1?'https://':'http://';

var jsonpRoot = "192.168.0.108:3004/";

if(window.location.host == "support.camera360.com"){
    jsonpRoot = "192.168.0.108:3004/";
}

c360.config = {

    mainRoot:httpUrl+window.location.host+'/',

    jsonpRoot:httpUrl+jsonpRoot,

    httpRoot:httpUrl
}
$.ns('c360.config');

var httpUrl = window.location.href.indexOf("https") != -1?'https://':'http://';

var jsonpRoot = "10.1.3.142:3004/";

if(window.location.host == "support.camera360.com"){
    jsonpRoot = "10.1.3.142:3004/";
}

c360.config = {

    mainRoot:httpUrl+window.location.host+'/',

    jsonpRoot:httpUrl+jsonpRoot,

    httpRoot:httpUrl
}
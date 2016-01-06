/**
 *  定义命名空间的函数
 *  @author fenghaiting@camera360.com
 *  @version 2015-5-26
 */
$.ns = function(){
    for(var j = 0;j < arguments.length;j++){
        ns = arguments[j];
        var nps = ns.split('.');
        var o = window;
        for(var i = 0 ; i < nps.length ; i++){
            o = o[nps[i]] = o[nps[i]] || {};
        }
    }
};

$.ns('c360.utils');

c360.utils = {
	getQueryString:function(){
        var url = window.location.href; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?")+1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
}
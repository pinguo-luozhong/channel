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
    },

    //时间戳转换标准时间
    unix2human: function (unix) {
        var monthUs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dateObj = new Date(unix);//new Date(unix * 1000);
        var UnixTimeToDate = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
        var singleDate = (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + "日";
        var dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = dayNames[dateObj.getDay()];
        var seccends = ":" + (dateObj.getSeconds() < 10 ? '0' : '') + dateObj.getSeconds();
        if (seccends == ":00") {
            seccends = "";
        }
        var time = (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours() + ":" + (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes() + seccends;
        return {
            week: week,
            singleDate: singleDate,
            date: UnixTimeToDate,
            time: time
        };
    },
}
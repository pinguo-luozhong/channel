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

    /**
     * 验证邮箱格式
     * @param  {[type]}  _value [description]
     * @return {Boolean}        [description]
     */
    isEmail:function(_value){
        if(_value==null||_value=="") {
            return false;
        }

        var _curValue=_value.replace(/(^\s*)|(\s*$)/g,""),
            emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if(emailReg.test(_curValue)) {
            return true;
        }else {
            return false;
        }
    },

    /**
     * 获取字符串长度
     * @param  {[type]} _str [description]
     * @return {[type]}      [description]
     */
    getStringLen:function(_value){
        var i,sum;
        sum = 0;
        for(i=0;i<_value.length;i++) {
            if ((_value.charCodeAt(i)>=0) && (_value.charCodeAt(i)<=255)){
                sum = sum+1;
            }
            else{
                sum = sum+2;
            }
        }
        return sum;
    },

    checkPassword:function(_this){
        var _pwd = $(_this).val().trim() || "";
        if (_pwd=="") {
            $(_this).next("span").html("密码不能为空！")
            return false;
        }else if(this.getStringLen(_pwd)>32 || this.getStringLen(_pwd)<6){
            $(_this).next("span").html("密码长度为6~32个字符！")
            return false;
        }else{
            $(_this).next("span").html("");
            return true;
        }
    },

    checkEmail:function(_this){
        var _email = $(_this).val().trim() || "";
        if (_email=="") {
            $(_this).next("span").html("邮箱不能为空！")
            return false;
        }else if(this.getStringLen(_email)>50){
            $(_this).next("span").html("邮箱长度不能超过50个字符！")
            return false;
        }else if(!this.isEmail(_email)){
            $(_this).next("span").html("邮箱格式不正确！")
            return false;
        }
        $(_this).next("span").html("");
        return true;
    },

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
/**
 * Created by luozhong on 16/1/5.
 */
var http = require("http");
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var superagent = require('superagent');


var domObj = {"descContain":{"self":{"Ele":"P","Class":"","Id":"","index":2},"par":{"Ele":"DIV","Class":"details-bd","Id":""},"grap":{"Ele":"DIV","Class":"mg-t10","Id":""}},"versionContain":{"self":{"Ele":"LI","Class":"","Id":"","index":1},"par":{"Ele":"UL","Class":"","Id":""},"grap":{"Ele":"ARTICLE","Class":"w220 fl-lf","Id":""}},"iconImgBox":{"self":{"Ele":"IMG","Class":"","Id":"","index":0},"par":{"Ele":"DIV","Class":"img-box fl-lf","Id":""},"grap":{"Ele":"ARTICLE","Class":"w535 fl-lf","Id":""}},"cutImgBox":{"self":{"Ele":"IMG","Class":"","Id":"","index":0},"par":{"Ele":"LI","Class":"","Id":""},"grap":{"Ele":"UL","Class":"","Id":""}}};

var checkClass = function(className){
    className = className == "" ? "" : "." + className;
    if(className!=""){
        className = className.split(" ");
        className = className.join(".");
    }
    return className;
};

//搜索dom树
var searchDom = function (html, domObj) {
    var $ = cheerio.load(html);

    var a = 0
    for (var i in domObj) {
        a++;
        var seccondObj = domObj[i];

        var grapEle = seccondObj.grap.Ele;
        var grapClass = checkClass(seccondObj.grap.Class);
        var grapId = seccondObj.grap.Id == "" ? "" : "#" + seccondObj.grap.Id;

        var parEle = seccondObj.par.Ele;
        var parClass = checkClass(seccondObj.par.Class);
        var parId = seccondObj.par.Id == "" ? "" : "#" + seccondObj.par.Id;

        var selfEle = seccondObj.self.Ele;
        var selfClass = checkClass(seccondObj.self.Class);
        var selfId = seccondObj.self.Id == "" ? "" : "#" + seccondObj.self.Id;
        var selfIndex = seccondObj.self.index;

        //通过CSS selector来筛选数据
        $(grapEle + grapId + grapClass + " " + parEle + parId + parClass + " " + selfEle + selfId + selfClass).each(function (index, element) {
            if(index == selfIndex){
                console.log(index, $(element).text());
            }
        });
    }
};

//遍历网页
var searchFuc = function (url) {
    superagent.get(url).end(function (err, res) {
        var html = res.text;
        var $ = cheerio.load(html);
        searchDom(html,domObj);
    });

};
searchFuc('http://www.99danji.com/az/176/');



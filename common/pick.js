/**
 * Created by luozhong on 16/1/5.
 */
var http = require("http");
var iconv = require('iconv-lite');

var req = http.request("http://www.99danji.com/az/176/", function (res) {
    res.on("data", function (chunk) {
        console.log(iconv.decode(chunk, "gbk"));
    });
}).on("error", function (e) {
    console.log(e.message);
});

req.end();
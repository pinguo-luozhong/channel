var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'public'));

// 设定view engine变量，意为网页模板引擎
//app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);

app.get('/', function (req, res) {
    res.render('channelManagement');
});

app.listen(3000, function () {
    console.log("start...");
});

var fs = require("fs");
var imageBuf = "https://dn-c360a.qbox.me/2838028b034ae297d72e4b2b41f22e45.jpg";
console.log(imageBuf.toString("base64"));
/**
 * Created by luozhong on 15/12/31.
 * desc：添加渠道接口
 */
// app：express对象
module.exports = function (app) {
    var urllib = require('url');
    var addChannel = require("./dbHelper").addChannel;

    app.get('/addChannel', function (req, res) {
        var params = urllib.parse(req.url, true);
        //console.log(params);
        //return
        //var channelName = req.body.channelName;
        //var channelUrl = req.body.channelUrl;
        var channelName = req.query.channelName;
        var channelUrl = req.query.channelUrl;
        var version = req.query.version;
        var imageList = req.query.imageList;
        var icon = req.query.icon;
        var desc = "";//暂时去掉描述
        var domObj = req.query.domObj;
        var p = {
            channelName: channelName,
            channelUrl: channelUrl,
            imageList:imageList,
            icon:icon,
            version:version,
            title:channelName,
            domObj:domObj,
            desc:desc,
            time:new Date().getTime()
        };
        addChannel(p, function (r) {
            var result = {
                status: r.status || 200,
                message: r.message || "ok",
                data: r.status == "201" ? "" : req.body
            };

            res.writeHeader(result.data,{
                'Content-Type' : 'application/json'  // 添加charset=utf-8
            });

            console.log("-------------"+params.query.callback);
            if (params.query && params.query.callback) {
                //console.log(params.query.callback);
                var str = params.query.callback + '(' + JSON.stringify(result) + ')';//jsonp
                res.end(str);
            } else {
                res.end(JSON.stringify(result));//普通的json
            }
        });
    });
};

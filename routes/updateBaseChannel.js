/**
 * Created by luozhong on 16/1/11.
 */
module.exports = function (app) {
    var urllib = require('url');
    var updateBaseChannel = require("./dbHelper").updateBaseChannel;

    app.get('/updateBaseChannel', function (req, res) {
        var params = urllib.parse(req.url, true);
        console.log(req.query.imageList);
        var p = {
            _id:req.query._id,
            imageList:req.query.imageList||[],
            icon:req.query.icon||"",
            version:req.query.version||"",
            desc:req.query.desc||"",
            time:new Date().getTime()
        };
        updateBaseChannel(p, function (r) {
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
/**
 * Created by luozhong on 15/12/31.
 * desc：删除渠道接口
 */
// app：express对象
module.exports = function (app) {
    var urllib = require('url');
    var delChannel = require("./dbHelper").delChannel;

    app.get('/delChannel', function (req, res) {
        var params = urllib.parse(req.url, true);

        var data = {
            _id:req.query._id
        };
        delChannel(data, function (r) {
            var result = {
                status: r.status || 200,
                message: r.message || "ok",
                total:r.total,
                data: r.status == "201" ? "" : r.data
            };

            res.writeHeader(result.data,{
                'Content-Type' : 'application/json'  // 添加charset=utf-8
            });

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

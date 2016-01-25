/**
 * Created by luozhong on 15/12/31.
 * desc：获取渠道接口
 */
// app：express对象
module.exports = function (app) {
    var urllib = require('url');
    var getChannelList = require("./dbHelper").getChannelList;

    app.get('/getChannelList', function (req, res) {
        var params = urllib.parse(req.url, true);

        var data = {
            skip:req.query.skip,
            limit:req.query.limit
        };
        getChannelList(data, function (r) {
            console.log("返回查询结果");
            var result = {
                status: r.status || 200,
                message: r.message || "ok",
                total:r.total,
                data: r.status == "201" ? "" : r.data
            };

            res.writeHeader(result.data,{
                'Content-Type' : 'application/json'  // 添加charset=utf-8
            });

            console.log(result);
            if (params.query && params.query.callback) {
                console.log("//jsonp");
                //console.log(params.query.callback);
                var str = params.query.callback + '(' + JSON.stringify(result) + ')';//jsonp
                res.end(str);
            } else {
                console.log("//普通的json");
                res.end(JSON.stringify(result));//普通的json
            }
        });
    });
};

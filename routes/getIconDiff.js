/**
 * Created by luozhong on 16/2/17.
 * 获取图标异常的数据
 */
module.exports = function (app) {
    var urllib = require('url');
    var getIconDiff = require("./dbHelper").getIconDiff;

    app.get('/getIconDiff', function (req, res) {
        var params = urllib.parse(req.url, true);

        var data = {
            skip:req.query.skip,
            limit:req.query.limit
        };
        getIconDiff(data, function (r) {
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

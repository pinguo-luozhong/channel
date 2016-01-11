/**
 * Created by luozhong on 16/1/10.
 */
module.exports = function (app) {
    var urllib = require('url');
    var startSearch = require('./selectData').startSearch;
    console.log(startSearch);
    app.get('/updateStatus', function (req, res) {
        var params = urllib.parse(req.url, true);
        startSearch();
        var result = {
            status: 200,
            message:"触发成功",
            data: []
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
};
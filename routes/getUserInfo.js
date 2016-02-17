/**
 * Created by luozhong on 16/2/16.
 */
module.exports = function (app) {
   var urllib = require('url');
    app.get('/getUserInfo', function (req, res) {
        var params = urllib.parse(req.url, true);
        var userName = req.session.user.userName||"";
        var result = {
            status:  200,
            message:"ok",
            data: userName||""
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

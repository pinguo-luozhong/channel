module.exports = function ( app ) {
    var urllib = require('url');
    app.get('/logout', function(req, res){
        var params = urllib.parse(req.url, true);
        req.session.user = null;
        req.session.error = null;
        var result = {
            status: 200,
            message: "ok",
            data:[]
        };

        res.writeHeader(result.data, {
            'Content-Type': 'application/json'  // 添加charset=utf-8
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
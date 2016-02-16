module.exports = function (app) {
    var urllib = require('url');
    var register = require("./dbHelper").register;

    app.get('/register',function(req,res){
        res.render('register');
    });

    app.post('/register', function (req, res) {
        var params = urllib.parse(req.url, true);

        var data = {
            userName: req.body.userName||"",
            password: req.body.password||""
        };
        register(data, function (r) {
            var result = {
                status: r.status || 200,
                message: r.message || "ok",
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
    });
};
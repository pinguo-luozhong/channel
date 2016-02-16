module.exports = function ( app ) {
    var urllib = require('url');
    var login = require("./dbHelper").login;

    app.get('/login',function(req,res){
        res.render('login');
    });

    app.post('/login', function (req, res) {
        var params = urllib.parse(req.url, true);

        var data = {
            userName: req.body.userName,
            password: req.body.password
        };
        login(data, function (r) {
            if(r.status == 200){//登录成功
                console.log(r.doc);
                req.session.user=r.doc;
            }
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
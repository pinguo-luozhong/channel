/**
 * Created by luozhong on 16/2/15.
 */
module.exports = function ( app ) {
    app.get('/home', function (req, res) {
        console.log(!req.session.user);
        if(!req.session.user){

            res.redirect("/login");

            req.session.error = "请先登录";
        }else{
            res.render('home');
        }
    });
};
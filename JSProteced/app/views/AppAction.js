/**
*  实例化应用视图
*  @author fenghaiting@camera360.com
*  @version 2015-5-26
*/

var MainView = require('../modules/pageMain/MainView.js');

var MainAction = require('../modules/pageMain/MainAction.js');

var MainAction = MainAction.MainAction;

var LoginView = require('../modules/pageLogin/LoginView.js');

var LoginAction = require('../modules/pageLogin/LoginAction.js');

var LoginAction = LoginAction.LoginAction;

var AppAction = Reflux.createActions(['setPage']);

var AppStore = Reflux.createStore({

    listenables:[AppAction],

    /**
     *  得到当前页面View功能
     *  @param  string page 表示页面名称
     *  @return 无
     */
    onSetPage: function(page) {

        $(this.pageDom || document.getElementById("pageIndex")).hide();

        this.pageDom = document.getElementById("page"+page);

        $(this.pageDom).show();

        $(document.body).removeClass('regist');

        switch (page) {
            case "Main":
                ReactDOM.render(<MainView />, this.pageDom);
                MainAction.setReset();
                MainAction.setTrigger();
                break;
            case "Login":
                $(document.body).addClass('regist');
                ReactDOM.render(<LoginView />, this.pageDom);
                LoginAction.setReset();
                LoginAction.setTrigger();
                break;
            default:
                throw new Error('unknown page:' + page);
        }
    }

});

module.exports = AppAction;
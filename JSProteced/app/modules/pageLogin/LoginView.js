/**
 *  初始化导航视图
 *  @author fenghaiting@camera360.com
 *  @version 2015-5-26
 */

var LoginAction = require('./LoginAction.js');

var LoginStore = LoginAction.LoginStore;

var LoginAction = LoginAction.LoginAction;

var AlertDialogView = require('../../components/dialog/AlertDialogView.js');

var ConfirmDialogView = require('../../components/dialog/ConfirmDialogView.js');

var LoadView = require('../../components/load/LoadView.js');

var LoginView = React.createClass({

    mixins:[Reflux.connect(LoginStore, 'pageObject')],

    getInitialState:function(){
        return {
            password: "",
            email:""
        };
    },

    render:function(){
        return (<div className="index carousel-inner">
                    <LoadView />
                    <AlertDialogView {...this.state} />
                    <ConfirmDialogView {...this.state} />
                    <div className="content-regist">
                        <h4>登录</h4>
                        <ul className="clearfix">
                            <li>
                                <input ref="email" id="email" onBlur={this.handlerBlurInputEvent} onChange={this.handleChangeEmailInputEvent} value={this.state.pageObject.email} type="text" className="input-regist" placeholder="键入用户名"/>
                                <span></span>
                            </li>
                            <li>
                                <input ref="password" id="password" onBlur={this.handlerBlurInputEvent} onChange={this.handleChangePasswordInputEvent} onFocus={this.handlerFocusInputEvent} value={this.state.pageObject.password} type="password" className="input-regist" placeholder="6-32位密码"/>
                                <span></span>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick={this.handlerLoginEvent} className="btn-login">登录</a>
                            </li>
                        </ul>
                    </div>
                </div>);
    },

    handlerBlurInputEvent:function(event){
        var target = $(event.currentTarget),
            id = target.attr("id") || "";
        if (id == "email") {
            c360.utils.checkEmail(target);
        }else if (id == "password") {
            c360.utils.checkPassword(target);
        }
    },

    handleChangeEmailInputEvent:function(event){
        var target = $(event.target),
            email = target.val().trim();
        this.state.pageObject.email = email;
        this.setState({
            email:email
        });
    },

    handleChangePasswordInputEvent:function(event){
        var target = $(event.target),
            password = target.val().trim();
        this.state.pageObject.password = password;
        this.setState({
            password:password
        });
    },

    handlerFocusInputEvent:function(event){
        this.state.pageObject.password = "";
        this.setState({
            password:""
        });
    },

    handlerLoginEvent:function(event){
        var checkFlag = this.validateInputValue();

        if(checkFlag){
            var d = {
                userName :$.trim($("#email").val()),
                password :$("#password").val()
            };
            c360.server.jsonpInterface('login',d,function(res){
                if(res.status == 200){
                    window.location.href = location.origin+"/home#page_Main";
                }else{
                    LoginStore.onShowAlert('Error',res.message,true);
                }
            }.bind(this),'POST');
        }
    },

    validateInputValue:function(){
        var _emailFlag = c360.utils.checkEmail($(ReactDOM.findDOMNode(this.refs.email))),
            _pwdFlag = c360.utils.checkPassword($(ReactDOM.findDOMNode(this.refs.password)));
        return _emailFlag && _pwdFlag;
    }
});

module.exports = LoginView;

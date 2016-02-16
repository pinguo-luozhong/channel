var LoginAction = Reflux.createActions(['setTrigger','setReset','showConfirm','showAlert']);

var LoginStore = Reflux.createStore({

    listenables:[LoginAction],

    onSetReset:function(){
        return this.pageObject = {
            password:"",
            email:"",
            showAlertTitle:'Error',
            showAlertMessage:"",
            showAlertFlag:false,
            showComfirmTitle:'',
            showComfirmMessage:'',
            showComfirmFlag:false,
        };
    },

    getInitialState:function(){
        return this.onSetReset();
    },

    onSetTrigger:function(){
        this.trigger(this.pageObject);
    },

    onShowAlert:function(title,message,flag,callback){
        this.pageObject.showAlertTitle = title;
        this.pageObject.showAlertFlag = flag;
        this.pageObject.showAlertMessage = message;
        this.pageObject.callback = callback;
        this.trigger(this.pageObject);
    },

    onShowConfirm:function(title,message,flag,comfirmCallback,cancelCallback){
        this.pageObject.showComfirmTitle = title;
        this.pageObject.showComfirmFlag = flag;
        this.pageObject.showComfirmMessage = message;
        this.pageObject.comfirmCallback = comfirmCallback;
        this.pageObject.cancelCallback = cancelCallback;
        this.trigger(this.pageObject);
    }

});

module.exports = {
    LoginAction:LoginAction,
    LoginStore:LoginStore
};
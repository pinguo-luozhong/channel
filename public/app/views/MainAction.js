var MainAction = Reflux.createActions(['getTemplateList','showAlert','setImageList','delImageList','showUpdateChannelAlert','setIcon','showChannelAlert','showConfirm','showEditAlert']);

var MainStore = Reflux.createStore({

    listenables:[MainAction],

    getInitialState:function(){

        return this.pageObject = {
            list : [],
            showEditAlertTitle:'',
            showEditAlertFlag:false,
            showEditAlertModel:[],
            showChannelAlertTitle:'',
            showChannelAlertFlag:false,
            channelName:'',
            channelUrl:'',
            showUpdateChannelAlertTitle:'',
            showUpdateChannelAlertFlag:false,
            channelId:'',
            updateChannelFlag:false,
            version:'',
            icon:'',
            desc:'',
            imageList:[],
            showAlertTitle:'Error',
            showAlertMessage:"",
            showAlertFlag:false,
            showComfirmTitle:'',
            showComfirmMessage:'',
            showComfirmFlag:false,
        };

    },

    onSetImageList:function(image){
        this.pageObject.imageList.push(image);
        this.trigger(this.pageObject);
    },

    onSetIcon:function(icon){
        this.pageObject.icon = icon;
        this.trigger(this.pageObject);
    },

    onDelImageList:function(image){
        var imageIndex = $.inArray(image, this.pageObject.imageList);
        this.pageObject.imageList.splice(imageIndex,1);
        this.trigger(this.pageObject);
    },

    onShowUpdateChannelAlert:function(title,flag,comfirmCallback,cancelCallback,updateChannelFlag,version,icon,desc,imageList,id){
        this.pageObject.showUpdateChannelAlertTitle = title;
        this.pageObject.showUpdateChannelAlertFlag = flag;
        this.pageObject.updateChannelFlag = updateChannelFlag;
        this.pageObject.version = version || '';
        this.pageObject.channelId = id || '';
        this.pageObject.icon = icon || '';
        this.pageObject.desc = desc || '';
        this.pageObject.imageList = imageList || [];
        this.pageObject.comfirmCallback = comfirmCallback;
        this.pageObject.cancelCallback = cancelCallback;
        this.trigger(this.pageObject);
    },

    onShowChannelAlert:function(title,flag,comfirmCallback,cancelCallback){
        this.pageObject.showChannelAlertTitle = title;
        this.pageObject.showChannelAlertFlag = flag;
        this.pageObject.channelName = '';
        this.pageObject.channelUrl = '';
        this.pageObject.comfirmCallback = comfirmCallback;
        this.pageObject.cancelCallback = cancelCallback;
        this.trigger(this.pageObject);
    },

    onShowEditAlert:function(title,flag,model,callback){
        this.pageObject.showEditAlertTitle = title;
        this.pageObject.showEditAlertFlag = flag;
        this.pageObject.showEditAlertModel = model;
        this.pageObject.callback = callback;
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
    },

    onGetTemplateList:function(index,callback){
        var data = {
            skip:index*5,
            limit:5
        };

        c360.server.jsonpInterface('getChannelList',data,function(res){
            if(res.status == 200){
                this.pageObject.list = res.data;
                this.trigger(this.pageObject);
                if ($.isFunction(callback)) callback(res.total);
            }else{
                this.onShowAlert('Error',res.statusText,true);
            }
        }.bind(this),'GET');
    }

});

module.exports = {
    MainAction:MainAction,
    MainStore:MainStore
};
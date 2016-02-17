var MainAction = require('./MainAction.js');
var MainStore = MainAction.MainStore;
var MainAction = MainAction.MainAction;

var PageAction = require('../../components/page/PageAction.js');
var PageAction = PageAction.PageAction;


var TopView = React.createClass({

    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
        this.getUserInfo();
    },

    render: function () {
        return (
            <div className="header">
                <a className="bottun4 relative" onClick={this.handleChannelEvent} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>点击添加渠道</span></div>
                </a>
                <a className="bottun4 relative" onClick={this.handleUpdateEvent} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>点击触发数据更新</span></div>
                </a>
                <a className="bottun4 relative" onClick={this.handleUpdateChannelEvent} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>编辑基础信息</span></div>
                </a>
                <a className="bottun4 relative" onClick={this.getVersionDiff} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>版本异常</span></div>
                </a>
                <a className="bottun4 relative" onClick={this.getIconDiff} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>图标异常</span></div>
                </a>
                <a className="bottun4 relative" onClick={this.getShotcutDiff} style={{margin:"11px 0px 0px 22px"}}>
                    <div><span>截图异常</span></div>
                </a>
                <p className="navbar-text">
                    <span node-type="navUserName" id="userName"></span>
                    <span node-type="navLogout" className="logout" onClick={this.logout}>退出</span>
                </p>
            </div>
        );
    },

    handleChannelEvent: function () {
        MainAction.showChannelAlert('温馨提示', true, function (event) {
            this.doAddChannel();
        }.bind(this));
    },

    //获取版本异常
    getVersionDiff:function(index,callback){
        var data = {
            skip:(index||0)*5,
            limit:5
        };
        c360.server.jsonpInterface('getVersionDiff',data,function(res){
            if(res.status == 200){
                MainStore.pageObject.list = res.data;
                MainStore.trigger(MainStore.pageObject);
                PageAction.setPageTotal(res.total, function (index) {
                    MainAction.getTemplateList(index);
                }.bind(this));
                if ($.isFunction(callback)) callback(res.total);
            }else{
                this.onShowAlert('Error',res.statusText,true);
            }
        }.bind(this),'GET');
    },
    //获取图标异常
    getIconDiff:function(index,callback){
        var data = {
            skip:(index||0)*5,
            limit:5
        };
        c360.server.jsonpInterface('getIconDiff',data,function(res){
            if(res.status == 200){
                MainStore.pageObject.list = res.data;
                MainStore.trigger(MainStore.pageObject);
                if ($.isFunction(callback)) callback(res.total);
            }else{
                this.onShowAlert('Error',res.statusText,true);
            }
        }.bind(this),'GET');
    },
    //获取截图异常
    getShotcutDiff:function(index,callback){
        var data = {
            skip:(index||0)*5,
            limit:5
        };
        c360.server.jsonpInterface('getShotcutDiff',data,function(res){
            if(res.status == 200){
                MainStore.pageObject.list = res.data;
                MainStore.trigger(MainStore.pageObject);
                if ($.isFunction(callback)) callback(res.total);
            }else{
                this.onShowAlert('Error',res.statusText,true);
            }
        }.bind(this),'GET');
    },

    doAddChannel: function () {
        var pageObject = this.props.pageObject;
        var channelName = pageObject.channelName;
        if (channelName == "") {
            MainAction.showAlert('Error', "渠道名称不能为空！", true);
            return;
        }
        var channelUrl = pageObject.channelUrl;
        if (channelUrl == "") {
            MainAction.showAlert('Error', "渠道url不能为空！", true);
            return;
        }

        var data = {
            channelName: pageObject.channelName,
            channelUrl: pageObject.channelUrl
        };

        c360.server.jsonpInterface('addChannel', data, function (res) {
            if (res.status == 200) {
                MainAction.showChannelAlert('温馨提示', false);
                MainAction.showAlert('Success', '添加渠道成功!', true);
            } else {
                MainAction.showAlert('Error', res.message, true);
            }
        }.bind(this), 'GET');
    },

    handleUpdateEvent: function () {
        c360.server.jsonpInterface('updateStatus', {}, function (res) {
            if (res.status == 200) {
                MainAction.showAlert('Success', '数据更新成功!', true);
            } else {
                MainAction.showAlert('Error', res.message, true);
            }
        }.bind(this), 'GET');
    },

    //获取基础渠道信息
    handleGetBaseChannel: function (callback) {
        c360.server.jsonpInterface('getChannelBaseData', {}, function (res) {
            if (typeof callback == "function") {
                callback(res);
            }
        }.bind(this), 'GET');
    },

    //更新基础渠道信息
    handleUpdateChannelEvent: function () {
        this.handleGetBaseChannel(function (res) {
            if (res.status == 200) {
                var data = res.data;
                if (data.length == 0) {
                    MainAction.showUpdateChannelAlert('温馨提示', true, function (event) {
                        this.doUpdateChannel();
                    }.bind(this), null, true);
                } else {
                    MainAction.showUpdateChannelAlert('温馨提示', true, function (event) {
                        this.doUpdateChannel();
                    }.bind(this), null, false, data[0].version, data[0].icon, data[0].imageList, data[0]._id);
                }
            } else {
                MainAction.showAlert('Error', res.message, true);
            }
        }.bind(this));
    },

    logout: function () {
        c360.server.jsonpInterface('logout', {}, function (res) {
            if(res.status == 200){
                location.reload();
            }
        }.bind(this), 'GET');
    },

    getUserInfo: function () {
        c360.server.jsonpInterface('getUserInfo', {}, function (res) {
            if (res.status == 200) {
                $("#userName").text(res.data);
            } else {
                MainAction.showAlert('Error', res.message, true);
            }
        }.bind(this), 'GET');
    },

    doUpdateChannel: function () {
        var pageObject = this.props.pageObject;
        var version = pageObject.version;
        if (version == "") {
            MainAction.showAlert('Error', "版本号不能为空！", true);
            return;
        }
        var icon = pageObject.icon;
        if (icon == "") {
            MainAction.showAlert('Error', "请上传图标！", true);
            return;
        }
        var imageList = pageObject.imageList;
        if (imageList.length == 0) {
            MainAction.showAlert('Error', "请上传截图！", true);
            return;
        }
        var data = {
            _id: this.props.pageObject.channelId,
            version: this.props.pageObject.version,
            icon: icon,
            imageList: imageList
        };


        c360.server.jsonpInterface('updateBaseChannel', data, function (res) {
            if (res.status == 200) {
                MainAction.showUpdateChannelAlert('温馨提示', false);
                MainAction.showAlert('Success', '更新成功!', true);
            } else {
                MainAction.showAlert('Error', res.message, true);
            }
        }.bind(this), 'GET');
    }
});

module.exports = TopView;
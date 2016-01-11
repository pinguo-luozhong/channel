var MainAction = require('./MainAction.js');

var MainAction = MainAction.MainAction;

var TopView = React.createClass({

    getInitialState:function(){
        return {

        };
    },

    render:function(){
        return (
                <div className="header">
                    <a className="bottun4 relative" onClick={this.handleChannelEvent} style={{margin:"11px 0px 0px 22px"}}>
                        <div><span>点击添加渠道</span></div>
                    </a>
                    <a className="bottun4 relative" onClick={this.handleUpdateEvent} style={{margin:"11px 0px 0px 22px"}}>
                        <div><span>点击触发数据更新</span></div>
                    </a>
                </div>
            );
    },

    handleChannelEvent:function(){
        MainAction.showChannelAlert('温馨提示',true,function(event){
            this.doAddChannel();
        }.bind(this));
    },

    doAddChannel:function(){
        var data = {
            channelName:this.props.pageObject.channelName,
            channelUrl:this.props.pageObject.channelUrl
        };
        c360.server.jsonpInterface('addChannel',data,function(res){
            if(res.status == 200){
                MainAction.showAlert('Success','添加渠道成功!',true);
            }else{
                MainAction.showAlert('Error',res.message,true);
            }
        }.bind(this),'GET');
    },

    handleUpdateEvent:function(){
        c360.server.jsonpInterface('updateStatus',{},function(res){
            if(res.status == 200){
                MainAction.showAlert('Success','数据更新成功!',true);
            }else{
                MainAction.showAlert('Error',res.message,true);
            }
        }.bind(this),'GET');
    }
});

module.exports = TopView;
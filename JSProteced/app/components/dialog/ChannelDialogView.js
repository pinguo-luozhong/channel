var ChannelDialogView = React.createClass({

    getInitialState:function(){
        return {
            showChannelAlertFlag: false,
            showChannelAlertTitle:'Error',
            channelName:'',
            channelUrl:''
        };
    },

    render:function(){
        return (
                <div id="channelDialog" onClick={this.handleHideEvent} className={this.props.pageObject.showChannelAlertFlag?"modal fade in":"modal fade"}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button onClick={this.handleCloseEvent} type="button" className="close">&times;</button>
                                <h4 className="modal-title">{this.props.pageObject.showChannelAlertTitle}</h4>
                            </div>
                            <div className="modal-body">
                                <div style={{display: 'block'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'60px',textAlign:'right'}}><div className="red">*</div>渠道名称</span>
                                    <input className="form-control" onChange={this.handleChannelNameEvent} value={this.props.pageObject.channelName} type="text" style={{display: 'inline-block',marginLeft:'10px'}} placeholder=""/>
                                </div>
                                <div style={{display: 'block',marginTop:'20px'}}>
                                    <span style={{display: 'inline-block',lineHeight:'24px',width:'60px',textAlign:'right'}}><div className="red">*</div>渠道url</span>
                                    <input className="form-control" onChange={this.handleChannelUrlEvent} value={this.props.pageObject.channelUrl} type="text" style={{display: 'inline-block',marginLeft:'10px'}} placeholder=""/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.handleConfirmEvent} type="button" className="btn">确认</button>
                                <button style={{marginLeft:'20px'}} onClick={this.handleCloseEvent} type="button" className="btn">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
    },

    handleHideEvent:function(event){
        var target = $(event.target);
        if(target.attr('id') == 'channelDialog') this.handleCloseEvent(event);
    },

    handleConfirmEvent:function(event){
        //this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.comfirmCallback)) this.props.pageObject.comfirmCallback();
    },

    handleCloseEvent:function(event){
        this.handleStateEvent(event);
        if($.isFunction(this.props.pageObject.cancelCallback)) this.props.pageObject.cancelCallback();
    },

    handleChannelUrlEvent:function(event){
        var target = $(event.target),
            channelUrl = target.val().trim();
        this.props.pageObject.channelUrl = channelUrl;
        this.setState({
            channelUrl:channelUrl
        });
    },

    handleChannelNameEvent:function(event){
        var target = $(event.target),
            channelName = target.val().trim();
        this.props.pageObject.channelName = channelName;
        this.setState({
            channelName:channelName
        });
    },

    handleStateEvent:function(event){
        event.stopPropagation();
        this.props.pageObject.showChannelAlertFlag = false;
        this.props.pageObject.showChannelAlertTitle = 'Error';
        this.setState({
            showChannelAlertFlag: false,
            showChannelAlertTitle:'Error',
        });
    }

});

module.exports = ChannelDialogView;